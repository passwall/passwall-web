# Passwall Web - Deployment Guide

This guide explains how to set up automated deployment for Passwall Web using GitHub Actions and PM2.

## 🚀 Overview

The deployment pipeline automatically:
- ✅ Builds the Next.js application
- ✅ Deploys to your server via SSH
- ✅ Backs up the current version
- ✅ Restarts the application with PM2
- ✅ Performs health checks

## 📋 Prerequisites

1. A Linux server (Ubuntu/Debian recommended)
2. SSH access to your server
3. Node.js 18+ installed on server
4. PM2 installed globally on server
5. GitHub repository with Actions enabled

## 🔧 Server Setup

### Option 1: Automated Setup (Recommended)

Run the setup script on your server:

```bash
# Download and run the setup script
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup.sh | bash
```

Or manually:

```bash
chmod +x scripts/server-setup.sh
./scripts/server-setup.sh
```

### Option 2: Manual Setup

1. **Install Node.js 18+**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. **Install PM2**
```bash
sudo npm install -g pm2
pm2 startup systemd
```

3. **Create deployment directory**
```bash
sudo mkdir -p /var/www/passwall-web
sudo chown -R $USER:$USER /var/www/passwall-web
mkdir -p /var/www/passwall-web/logs
```

4. **Install Nginx (Optional but recommended)**
```bash
sudo apt-get install -y nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/passwall-web
```

Add this configuration:
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

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/passwall-web /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

5. **Setup SSL with Let's Encrypt**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d passwall.io -d www.passwall.io
```

## 🔐 GitHub Secrets Configuration

Add these secrets to your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add the following secrets:

| Secret Name | Description | Example |
|------------|-------------|---------|
| `SERVER_HOST` | Your server IP or domain | `123.45.67.89` or `passwall.io` |
| `SERVER_USERNAME` | SSH username | `deploy` or `ubuntu` |
| `SSH_PRIVATE_KEY` | Your private SSH key | `-----BEGIN RSA PRIVATE KEY-----...` |
| `SERVER_PORT` | SSH port (optional) | `22` |
| `DEPLOY_PATH` | Deployment directory | `/var/www/passwall-web` |
| `APP_URL` | Your app URL for health check | `https://passwall.io` |

### Generating SSH Key Pair

On your local machine:

```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f ~/.ssh/passwall_deploy

# Copy public key to server
ssh-copy-id -i ~/.ssh/passwall_deploy.pub user@your-server

# Copy private key for GitHub Secret (copy the entire output)
cat ~/.ssh/passwall_deploy
```

## 📦 PM2 Configuration

The `ecosystem.config.js` file is included in your project. You can customize it:

```javascript
module.exports = {
  apps: [
    {
      name: 'passwall-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1, // Change to 'max' for cluster mode
      autorestart: true,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
```

### Useful PM2 Commands

```bash
# View running processes
pm2 list

# View logs
pm2 logs passwall-web

# Restart application
pm2 restart passwall-web

# Stop application
pm2 stop passwall-web

# Monitor resources
pm2 monit

# Save PM2 configuration
pm2 save

# View detailed info
pm2 show passwall-web
```

## 🎯 Deployment Workflow

### Automatic Deployment

Push to `main` or `master` branch:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

The GitHub Action will automatically:
1. Build the application
2. Create a deployment package
3. Transfer files to server
4. Backup current version
5. Extract new files
6. Install dependencies
7. Restart PM2
8. Perform health check

### Manual Deployment

Trigger manually from GitHub Actions:
1. Go to **Actions** tab
2. Select **Build and Deploy to Server**
3. Click **Run workflow**
4. Select branch and run

## 🔍 Monitoring & Debugging

### Check Deployment Status

```bash
# SSH into your server
ssh user@your-server

# Check PM2 status
pm2 status

# View recent logs
pm2 logs passwall-web --lines 100

# Check Nginx status
sudo systemctl status nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Rollback to Previous Version

```bash
# SSH into server
ssh user@your-server

# List backups
ls -la /var/www/ | grep passwall-web-backup

# Restore from backup
cd /var/www
sudo rm -rf passwall-web
sudo cp -r passwall-web-backup-YYYYMMDD-HHMMSS passwall-web
pm2 restart passwall-web
```

## 🔄 Alternative Deployment Methods

### Using PM2 Deploy (Alternative to GitHub Actions)

```bash
# On your local machine
pm2 deploy production setup
pm2 deploy production
```

### Using Docker (Future Enhancement)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🛡️ Security Best Practices

1. **Use SSH keys instead of passwords**
2. **Configure firewall** (UFW):
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```
3. **Keep system updated**:
   ```bash
   sudo apt-get update && sudo apt-get upgrade -y
   ```
4. **Use fail2ban** to prevent brute force:
   ```bash
   sudo apt-get install fail2ban
   ```
5. **Enable SSL/TLS** with Let's Encrypt
6. **Set proper file permissions**:
   ```bash
   sudo chown -R $USER:$USER /var/www/passwall-web
   chmod -R 755 /var/www/passwall-web
   ```

## 📊 Performance Optimization

### Enable PM2 Cluster Mode

Edit `ecosystem.config.js`:
```javascript
instances: 'max', // Use all CPU cores
exec_mode: 'cluster'
```

### Enable Next.js Compression

Install compression:
```bash
npm install compression
```

### Setup CDN (Optional)

Consider using Cloudflare or similar CDN for:
- Static asset caching
- DDoS protection
- SSL/TLS
- Global distribution

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Ensure all dependencies are listed in `package.json`
- Check build logs in GitHub Actions

### Deployment Fails
- Verify SSH connection: `ssh user@server`
- Check GitHub Secrets are correct
- Ensure server has enough disk space: `df -h`
- Check server logs: `pm2 logs`

### Application Won't Start
- Check PM2 logs: `pm2 logs passwall-web --err`
- Verify environment variables
- Ensure port 3000 is not in use: `lsof -i :3000`
- Check file permissions

### 502 Bad Gateway (Nginx)
- Verify Next.js is running: `pm2 list`
- Check Nginx configuration: `sudo nginx -t`
- Review Nginx logs: `sudo tail -f /var/log/nginx/error.log`

## 📞 Support

For issues or questions:
- GitHub Issues: https://github.com/passwall/passwall-web/issues
- Email: hello@passwall.io
- Documentation: https://passwall.io/docs

## 📝 License

This deployment configuration is part of the Passwall Web project.

