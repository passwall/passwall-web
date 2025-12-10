# Troubleshooting Guide

Common issues and solutions for Passwall Web deployment.

## 🔴 Server Setup Issues

### Node.js 18 Dependency Error (Ubuntu 18.04)

**Error:**
```
nodejs : Depends: libc6 (>= 2.28) but 2.27-3ubuntu1.6 is to be installed
E: Unable to correct problems, you have held broken packages.
```

**Cause:** Ubuntu 18.04 has glibc 2.27, but Node.js 18 requires glibc 2.28+

**Quick Fix:** Use Node.js 16 instead (compatible with Ubuntu 18.04)

```bash
# Remove any existing Node.js
sudo apt-get remove -y nodejs npm

# Install Node.js 16
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v16.x.x
```

**Or use our automated script:**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup-ubuntu18.sh | bash
```

**Full details:** See [UBUNTU-18-FIX.md](./UBUNTU-18-FIX.md)

---

### Node.js Version Conflict / PM2 Installation Error

**Error:**
```
npm WARN notsup Unsupported engine for pm2: wanted: {"node":">=16.0.0"} (current: {"node":"14.3.0"})
npm ERR! EEXIST: file already exists, symlink '../lib/node_modules/pm2/bin/pm2' -> '/usr/local/bin/pm2'
```

**Cause:** Old Node.js version still active or PM2 already installed

**Quick Fix:**
```bash
# Run the fix script
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/fix-node-version.sh | bash
```

**Manual Fix:**
```bash
# Remove old PM2
sudo npm uninstall -g pm2
sudo rm -f /usr/local/bin/pm2
sudo rm -rf /usr/local/lib/node_modules/pm2

# Remove all Node.js versions
sudo apt-get remove -y --purge nodejs npm
sudo apt-get autoremove -y
sudo rm -f /usr/bin/node /usr/bin/npm

# Reinstall Node.js 16
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify correct version
node --version  # Should be v16.x.x
which node      # Should be /usr/bin/node

# Install PM2
sudo npm install -g pm2
```

---

### PostgreSQL Repository Error

**Error:**
```
E: The repository 'http://apt.postgresql.org/pub/repos/apt bionic-pgdg Release' no longer has a Release file.
```

**Solution:**

Run this command on your server to fix the repository issue:

```bash
sudo rm -f /etc/apt/sources.list.d/pgdg.list
sudo rm -f /etc/apt/sources.list.d/postgresql.list
sudo apt-get clean
sudo apt-get update
```

Or use our fix script:

```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/fix-server.sh | bash
```

Then run the setup script again:

```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup.sh | bash
```

### Manual Setup (If Scripts Fail)

If the automated scripts don't work, follow these manual steps:

#### 1. Fix Repository Issues
```bash
# Remove problematic repositories
sudo rm -f /etc/apt/sources.list.d/pgdg.list
sudo rm -f /etc/apt/sources.list.d/postgresql.list

# Clean and update
sudo apt-get clean
sudo apt-get update
sudo apt-get upgrade -y
```

#### 2. Install Node.js 18
```bash
# Install dependencies
sudo apt-get install -y curl wget git build-essential

# Remove old Node.js
sudo apt-get remove -y nodejs npm

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version
```

#### 3. Install PM2
```bash
# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 to start on boot
pm2 startup systemd

# Follow the command it outputs (copy and paste it)
```

#### 4. Create Application Directory
```bash
# Create app directory
sudo mkdir -p /var/www/passwall-web
sudo mkdir -p /var/www/passwall-web/logs

# Set proper ownership
sudo chown -R $USER:$USER /var/www/passwall-web
```

#### 5. Install Nginx (Optional)
```bash
# Install Nginx
sudo apt-get install -y nginx

# Create configuration
sudo nano /etc/nginx/sites-available/passwall-web
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

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

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/passwall-web /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

#### 6. Setup Firewall
```bash
sudo apt-get install -y ufw
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

#### 7. Setup SSH Keys for GitHub Actions
```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "github-deploy" -f ~/.ssh/passwall_deploy

# Add to authorized keys
cat ~/.ssh/passwall_deploy.pub >> ~/.ssh/authorized_keys

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
chmod 600 ~/.ssh/passwall_deploy*

# Display private key (copy this for GitHub Secret)
cat ~/.ssh/passwall_deploy
```

## 🔴 Deployment Issues

### GitHub Actions: Permission Denied
**Solution:** Check your SSH private key is correctly added to GitHub Secrets.

```bash
# On server, verify authorized_keys
cat ~/.ssh/authorized_keys

# Test SSH connection from local machine
ssh -i ~/.ssh/passwall_deploy user@server
```

### PM2 Process Not Starting
```bash
# Check PM2 logs
pm2 logs passwall-web --lines 50

# Delete and restart
pm2 delete passwall-web
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save
```

### Port 3000 Already in Use
```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Or change the port in ecosystem.config.js
```

### Build Fails: Out of Memory
```bash
# Increase Node memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Nginx 502 Bad Gateway
```bash
# Check if Next.js is running
pm2 list

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# Test Nginx config
sudo nginx -t

# Restart services
pm2 restart passwall-web
sudo systemctl restart nginx
```

## 🔴 SSL/HTTPS Issues

### Let's Encrypt Certificate Installation
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### Certificate Renewal Failed
```bash
# Check Certbot logs
sudo cat /var/log/letsencrypt/letsencrypt.log

# Manually renew
sudo certbot renew --force-renewal

# Restart Nginx
sudo systemctl restart nginx
```

## 🔴 PM2 Issues

### PM2 Not Starting on Reboot
```bash
# Re-run PM2 startup
pm2 startup systemd

# Run the command it outputs
# Then save the current PM2 processes
pm2 save

# Test by rebooting
sudo reboot
```

### PM2 Logs Too Large
```bash
# Install PM2 log rotation
pm2 install pm2-logrotate

# Configure rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Clear PM2 Logs
```bash
pm2 flush passwall-web
```

## 🔴 Git/GitHub Actions Issues

### Workflow Not Triggering
1. Check branch name (must be `main` or `master`)
2. Verify workflow file is in `.github/workflows/`
3. Check GitHub Actions is enabled in repository settings

### SSH Connection Timeout
```bash
# On server, check SSH is running
sudo systemctl status ssh

# Check firewall
sudo ufw status

# Test from local machine
ssh -vvv user@server
```

### Deployment Succeeds but Site Not Updated
```bash
# SSH to server
ssh user@server

# Check deployment directory
ls -la /var/www/passwall-web

# Check if PM2 restarted
pm2 logs passwall-web --lines 20

# Manually restart
pm2 restart passwall-web
```

## 🔴 Ubuntu Version Issues

### Ubuntu 18.04 (Bionic) - EOL Warning
Ubuntu 18.04 reached end of life. Consider upgrading to Ubuntu 20.04 or 22.04.

**Upgrade Steps:**
```bash
# Backup your data first!

# Update current system
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y

# Install update manager
sudo apt-get install update-manager-core

# Upgrade to next LTS
sudo do-release-upgrade
```

## 🔴 Performance Issues

### High Memory Usage
```bash
# Check memory
free -h

# Limit PM2 memory
# Edit ecosystem.config.js:
max_memory_restart: '500M'  # Adjust as needed

pm2 restart passwall-web
```

### High CPU Usage
```bash
# Monitor with PM2
pm2 monit

# Check system resources
top
htop

# Enable cluster mode in ecosystem.config.js:
instances: 2  # or 'max' for all CPUs
exec_mode: 'cluster'
```

## 🔴 Node.js Issues

### Wrong Node Version
```bash
# Check current version
node --version

# Remove old Node.js
sudo apt-get remove -y nodejs npm

# Install correct version
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### npm Install Fails
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install --legacy-peer-deps
```

## 🔴 Emergency Rollback

### Restore Previous Version
```bash
# SSH to server
ssh user@server

# List backups
ls -la /var/www/ | grep passwall-web-backup

# Stop current version
pm2 stop passwall-web

# Restore backup
cd /var/www
sudo mv passwall-web passwall-web-broken
sudo cp -r passwall-web-backup-YYYYMMDD-HHMMSS passwall-web
sudo chown -R deploy:deploy passwall-web

# Restart PM2
pm2 restart passwall-web
```

## 📞 Getting Help

If you're still stuck:

1. **Check Logs:**
   ```bash
   # PM2 logs
   pm2 logs passwall-web
   
   # Nginx logs
   sudo tail -f /var/log/nginx/error.log
   
   # System logs
   sudo journalctl -xe
   ```

2. **GitHub Issues:** https://github.com/passwall/passwall-web/issues

3. **Email:** hello@passwall.io

4. **Include in your report:**
   - Error message
   - Server OS version: `lsb_release -a`
   - Node version: `node --version`
   - PM2 version: `pm2 --version`
   - Relevant logs

