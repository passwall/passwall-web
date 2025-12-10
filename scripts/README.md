# Server Setup Scripts

Choose the right setup script for your Ubuntu version.

## 🎯 Quick Guide

| Your Ubuntu Version | Node.js Version | Script to Use |
|---------------------|----------------|---------------|
| **Ubuntu 24.04** ✨ | Node.js 20 | `server-setup-ubuntu24.sh` |
| **Ubuntu 22.04** | Node.js 18-20 | `server-setup.sh` or `server-setup-ubuntu24.sh` |
| **Ubuntu 20.04** | Node.js 18 | `server-setup.sh` |
| **Ubuntu 18.04** ⚠️ | Node.js 16 | `server-setup-ubuntu18.sh` |

---

## 🚀 One-Line Setup Commands

### Ubuntu 24.04 (Recommended)
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup-ubuntu24.sh | bash
```

### Ubuntu 22.04 / 20.04
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup.sh | bash
```

### Ubuntu 18.04 (Legacy)
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup-ubuntu18.sh | bash
```

---

## 🛠️ Available Scripts

### Core Setup Scripts

#### `server-setup-ubuntu24.sh` ⭐ **Recommended for Ubuntu 24.04**
- Installs Node.js 20
- Creates `deploy` user FIRST
- Installs PM2
- Configures Nginx (optional)
- Sets up SSL support
- Configures firewall

#### `server-setup.sh` - **For Ubuntu 20.04/22.04**
- Installs Node.js 18
- General purpose setup
- Works on most modern Ubuntu versions

#### `server-setup-ubuntu18.sh` - **For Ubuntu 18.04 only**
- Installs Node.js 16 (compatible with glibc 2.27)
- Handles old Ubuntu limitations

### Fix Scripts

#### `quick-fix-deploy-user.sh` - **Fix "invalid user" error**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/quick-fix-deploy-user.sh | bash
```
Use when: `chown: invalid user: 'deploy:deploy'`

#### `fix-node-version.sh` - **Fix Node.js version conflicts**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/fix-node-version.sh | bash
```
Use when: Multiple Node.js versions or PM2 conflicts

#### `fix-server.sh` - **Fix repository issues**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/fix-server.sh | bash
```
Use when: PostgreSQL repository errors

#### `install-node-nvm.sh` - **Install Node.js via NVM**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/install-node-nvm.sh | bash
```
Use when: System Node.js installation fails

---

## 🔧 Common Error Fixes

### Error: "chown: invalid user: 'deploy:deploy'"
**Fix:**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/quick-fix-deploy-user.sh | bash
```

### Error: "Depends: libc6 (>= 2.28)"
**Fix:** Use the Ubuntu 18.04 script with Node.js 16
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup-ubuntu18.sh | bash
```

### Error: "EEXIST: file already exists" (PM2)
**Fix:**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/fix-node-version.sh | bash
```

### Error: PostgreSQL repository errors
**Fix:**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/fix-server.sh | bash
```

---

## 📋 What Each Script Does

### Full Setup Scripts
All setup scripts will:
- ✅ Fix repository issues
- ✅ Update system packages
- ✅ Create deploy user
- ✅ Install Node.js
- ✅ Install PM2
- ✅ Setup PM2 startup
- ✅ Create app directories
- ✅ Configure Nginx (optional)
- ✅ Setup firewall
- ✅ Provide next steps

### After Running Any Setup Script

1. **Setup SSH keys** (as deploy user):
```bash
sudo su - deploy
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/passwall_deploy
cat ~/.ssh/passwall_deploy.pub >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

2. **Copy private key** for GitHub Secret:
```bash
cat ~/.ssh/passwall_deploy
```

3. **Configure GitHub Secrets** with your server details

4. **Push to main branch** to trigger deployment

---

## 🔍 Check Your Ubuntu Version

Not sure which version you have?

```bash
lsb_release -a
# or
cat /etc/os-release
```

---

## 🎯 Recommended Path for Ubuntu 24.04

Since you're on Ubuntu 24.04:

### **Step 1: Fix Current Error**
```bash
# Quick fix for the deploy user issue
sudo useradd -m -s /bin/bash deploy
sudo mkdir -p /var/www/passwall-web/logs
sudo chown -R deploy:deploy /var/www/passwall-web
```

### **Step 2: Continue Installation**
```bash
# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v20.x.x
```

### **Step 3: Install PM2**
```bash
sudo npm install -g pm2@latest
pm2 --version
```

### **Step 4: Setup PM2 Startup**
```bash
sudo su - deploy
pm2 startup systemd
# Copy and run the command it shows
exit
```

### **Step 5: Setup SSH Keys**
```bash
sudo su - deploy
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/passwall_deploy
cat ~/.ssh/passwall_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/passwall_deploy  # Copy this for GitHub
exit
```

### **Step 6: Configure GitHub Secrets**
Add the secrets to your GitHub repository (see main README)

### **Step 7: Deploy!**
```bash
git push origin main
```

---

## 💡 Pro Tips

1. **Use the automated scripts** - They handle edge cases
2. **Always verify Node.js version** after installation
3. **Test SSH connection** before deploying
4. **Monitor first deployment** closely
5. **Setup Nginx and SSL** for production

---

## 📞 Need Help?

- **Quick fix errors**: See this README
- **Detailed troubleshooting**: See `../TROUBLESHOOTING.md`
- **Ubuntu 24.04 specific**: See `../UBUNTU-24-SETUP.md`
- **Deployment guide**: See `../DEPLOYMENT.md`

---

## 🎉 Success Indicators

After running setup, you should see:
- ✅ `deploy` user exists: `id deploy`
- ✅ Node.js installed: `node --version`
- ✅ PM2 installed: `pm2 --version`
- ✅ Directory owned by deploy: `ls -ld /var/www/passwall-web`
- ✅ Nginx running: `systemctl status nginx`
- ✅ Firewall active: `sudo ufw status`

