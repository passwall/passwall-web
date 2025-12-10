# Ubuntu 24.04 Server Setup Guide

Great choice! Ubuntu 24.04 is the latest LTS with full support for Node.js 20.

## 🔴 Current Error Fix

You got this error:
```
chown: invalid user: 'deploy:deploy'
```

This happened because the `deploy` user wasn't created before trying to use it.

---

## ✅ **Quick Fix (Run on Server NOW)**

```bash
# Create the deploy user
sudo useradd -m -s /bin/bash deploy

# Create and setup directories
sudo mkdir -p /var/www/passwall-web/logs
sudo chown -R deploy:deploy /var/www/passwall-web

# Verify
id deploy
ls -ld /var/www/passwall-web
```

**Or use our quick fix script:**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/quick-fix-deploy-user.sh | bash
```

---

## 🚀 **Complete Fresh Setup (Recommended)**

If you want to start fresh on your Ubuntu 24.04 server:

```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup-ubuntu24.sh | bash
```

This will:
1. ✅ Create `deploy` user FIRST
2. ✅ Install Node.js 20
3. ✅ Install PM2
4. ✅ Setup directories with correct ownership
5. ✅ Configure Nginx (optional)
6. ✅ Setup firewall

---

## 📝 **Manual Complete Setup**

### 1. Create Deploy User
```bash
sudo useradd -m -s /bin/bash deploy
sudo passwd deploy  # Set password (optional)
```

### 2. Install Node.js 20
```bash
# Remove old versions
sudo apt-get remove -y nodejs npm

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v20.x.x
npm --version   # Should show v10.x.x
```

### 3. Install PM2
```bash
sudo npm install -g pm2@latest
pm2 --version
```

### 4. Setup PM2 for deploy user
```bash
# Switch to deploy user
sudo su - deploy

# Setup PM2 startup
pm2 startup systemd

# Exit back to your user
exit

# Run the sudo command that PM2 showed
# It will look like:
# sudo env PATH=... pm2 startup systemd -u deploy --hp /home/deploy
```

### 5. Create Application Directory
```bash
sudo mkdir -p /var/www/passwall-web/logs
sudo chown -R deploy:deploy /var/www/passwall-web
```

### 6. Setup SSH Keys (as deploy user)
```bash
# Switch to deploy user
sudo su - deploy

# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/passwall_deploy

# Add to authorized keys
cat ~/.ssh/passwall_deploy.pub >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Display private key (copy this for GitHub Secret)
cat ~/.ssh/passwall_deploy

# Exit back to your user
exit
```

### 7. Install Nginx
```bash
sudo apt-get install -y nginx

# Create configuration
sudo nano /etc/nginx/sites-available/passwall-web
```

Paste:
```nginx
server {
    listen 80;
    server_name passwall.io www.passwall.io;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/passwall-web /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 8. Setup SSL
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d passwall.io -d www.passwall.io
```

### 9. Configure Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 🔐 **Configure GitHub Secrets**

In your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

```
SERVER_HOST       = your-server-ip
SERVER_USERNAME   = deploy
SSH_PRIVATE_KEY   = (private key from ~/.ssh/passwall_deploy)
SERVER_PORT       = 22
DEPLOY_PATH       = /var/www/passwall-web
APP_URL           = https://passwall.io
```

**I've already updated the GitHub Actions workflows to use Node.js 20!** ✅

---

## ✅ **Verification Checklist**

After setup, verify everything:

```bash
# Check deploy user exists
id deploy

# Check Node.js version
node --version  # Should be v20.x.x

# Check PM2
pm2 --version

# Check directory ownership
ls -ld /var/www/passwall-web

# Check SSH key for deploy user
sudo ls -la /home/deploy/.ssh/

# Check Nginx
sudo systemctl status nginx

# Check firewall
sudo ufw status
```

---

## 🚀 **Test Deployment**

### Manual First Deployment (Recommended)

```bash
# Clone your repo to test
cd /tmp
git clone https://github.com/passwall/passwall-web.git
cd passwall-web

# Build
npm ci --legacy-peer-deps
npm run build

# Copy to app directory
sudo cp -r .next /var/www/passwall-web/
sudo cp -r public /var/www/passwall-web/
sudo cp -r package*.json /var/www/passwall-web/
sudo cp -r *.js /var/www/passwall-web/
sudo chown -R deploy:deploy /var/www/passwall-web

# Switch to deploy user and start PM2
sudo su - deploy
cd /var/www/passwall-web
npm ci --production --legacy-peer-deps
pm2 start ecosystem.config.js --env production
pm2 save
pm2 list

# Exit
exit
```

### Automated Deployment

Once manual deployment works, push to GitHub:

```bash
git push origin main
```

Watch the deployment in **GitHub Actions** tab!

---

## 📊 **Ubuntu 24.04 Advantages**

- ✅ Latest security patches
- ✅ Native Node.js 20 support
- ✅ Better performance
- ✅ Long-term support until 2034
- ✅ Modern kernel and libraries

---

## 🎯 **Summary**

**Quick Fix (for current error):**
```bash
sudo useradd -m -s /bin/bash deploy
sudo mkdir -p /var/www/passwall-web/logs
sudo chown -R deploy:deploy /var/www/passwall-web
```

**Complete Fresh Setup:**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup-ubuntu24.sh | bash
```

**After setup:**
1. Configure GitHub Secrets
2. Push to main branch
3. Watch deployment succeed! 🎉

