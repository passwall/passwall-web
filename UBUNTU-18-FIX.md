# Ubuntu 18.04 Compatibility Fix

## The Problem

Ubuntu 18.04 has **glibc 2.27**, but Node.js 18 requires **glibc 2.28+**. This causes the installation to fail with:

```
nodejs : Depends: libc6 (>= 2.28) but 2.27-3ubuntu1.6 is to be installed
```

## Solutions (Choose One)

### ✅ **Solution 1: Use Node.js 16** (Recommended - Easiest)

Node.js 16 is compatible with Ubuntu 18.04 and is still supported until September 2024.

**Quick Install:**
```bash
# Remove any existing Node.js
sudo apt-get remove -y nodejs npm

# Fix repository issues
sudo rm -f /etc/apt/sources.list.d/pgdg.list
sudo apt-get clean && sudo apt-get update

# Install Node.js 16
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v16.x.x
npm --version
```

**Or use our automated script:**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup-ubuntu18.sh | bash
```

**Then update GitHub Actions:**
Edit `.github/workflows/deploy.yml` and `.github/workflows/test.yml`:
```yaml
node-version: '16'  # Changed from '18'
```

---

### ✅ **Solution 2: Use NVM** (Flexible)

NVM (Node Version Manager) can install Node.js without system dependencies.

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js 18 (or any version)
nvm install 18
nvm use 18
nvm alias default 18

# Verify
node --version
npm --version

# Install PM2
npm install -g pm2

# Add NVM to your shell
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.bashrc
source ~/.bashrc
```

**Or use our script:**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/install-node-nvm.sh | bash
```

**Update PM2 ecosystem config:**
Edit `ecosystem.config.js`:
```javascript
script: '/home/your-user/.nvm/versions/node/v18.x.x/bin/next',
```

---

### ✅ **Solution 3: Upgrade to Ubuntu 20.04/22.04** (Best Long-term)

Ubuntu 18.04 reached end-of-life in May 2023. Upgrading provides:
- Latest security patches
- Native Node.js 18+ support
- Better package compatibility

**Before upgrading:**
```bash
# Backup everything!
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
```

**Upgrade to Ubuntu 20.04:**
```bash
# Install update manager
sudo apt-get install update-manager-core

# Start upgrade
sudo do-release-upgrade
```

**After upgrade:**
```bash
# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version  # Should show v18.x.x
```

---

### ✅ **Solution 4: Use Docker** (Isolated)

Run the application in a Docker container with Node.js 18.

**Create Dockerfile:**
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

**Build and run:**
```bash
docker build -t passwall-web .
docker run -d -p 3000:3000 --name passwall-web passwall-web
```

---

## Recommended Approach

**For Quick Setup (works now):**
→ Use **Solution 1: Node.js 16**

**For Future-proofing:**
→ Use **Solution 3: Upgrade to Ubuntu 20.04**

---

## Step-by-Step: Solution 1 (Node.js 16)

### 1. Clean up any broken installations
```bash
sudo apt-get remove -y nodejs npm
sudo apt-get autoremove -y
sudo apt-get clean
```

### 2. Fix repository issues
```bash
sudo rm -f /etc/apt/sources.list.d/pgdg.list
sudo rm -f /etc/apt/sources.list.d/postgresql.list
sudo apt-get update
```

### 3. Install Node.js 16
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 4. Verify installation
```bash
node --version  # Should show v16.x.x
npm --version   # Should show v8.x.x
```

### 5. Install PM2
```bash
sudo npm install -g pm2
pm2 --version
```

### 6. Setup PM2 startup
```bash
pm2 startup systemd
# Run the command it outputs
```

### 7. Update GitHub Actions
Edit both workflow files to use Node.js 16:
- `.github/workflows/deploy.yml`
- `.github/workflows/test.yml`

Change:
```yaml
node-version: '18'
```
To:
```yaml
node-version: '16'
```

### 8. Commit and push
```bash
git add .github/workflows/
git commit -m "Use Node.js 16 for Ubuntu 18.04 compatibility"
git push origin main
```

---

## Troubleshooting

### Still getting dependency errors?
```bash
# Clear all package locks
sudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*
sudo apt-get update

# Try installing with --fix-missing
sudo apt-get install -y --fix-missing nodejs
```

### NVM not working in PM2?
```bash
# Find Node.js path
which node

# Update ecosystem.config.js
script: '/full/path/to/node_modules/next/dist/bin/next'
```

### Need to rollback?
```bash
# Remove Node.js
sudo apt-get remove -y nodejs npm

# Reinstall from repository
sudo apt-get install -y nodejs npm
```

---

## Version Compatibility Matrix

| Ubuntu Version | Max Node.js Version | Recommended |
|----------------|---------------------|-------------|
| 18.04 (Bionic) | 16.x | Use Node 16 or upgrade OS |
| 20.04 (Focal)  | 18.x | ✅ Use Node 18 |
| 22.04 (Jammy)  | 20.x | ✅ Use Node 20 |

---

## Need Help?

1. Check logs: `pm2 logs`
2. Verify Node version: `node --version`
3. See full troubleshooting: `TROUBLESHOOTING.md`
4. Open an issue on GitHub

---

## Summary

**Quick Fix (works immediately):**
```bash
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup-ubuntu18.sh | bash
```

Then update your GitHub Actions workflows to use Node.js 16.

**Best Long-term Solution:**
Upgrade to Ubuntu 20.04 or 22.04 for native Node.js 18+ support.

