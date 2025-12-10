#!/bin/bash

# Fix Node.js version conflicts and PM2 installation
# Run this if you have multiple Node.js versions installed

set -e

echo "🔧 Fixing Node.js version conflicts..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Remove old PM2 installation
echo -e "${GREEN}[1/6] Removing old PM2 installation...${NC}"
sudo npm uninstall -g pm2 2>/dev/null || true
sudo rm -f /usr/local/bin/pm2 2>/dev/null || true
sudo rm -f /usr/bin/pm2 2>/dev/null || true
sudo rm -rf /usr/local/lib/node_modules/pm2 2>/dev/null || true

# 2. Remove ALL old Node.js installations
echo -e "${GREEN}[2/6] Removing old Node.js installations...${NC}"
sudo apt-get remove -y --purge nodejs npm 2>/dev/null || true
sudo apt-get autoremove -y

# Remove any leftover binaries
sudo rm -f /usr/bin/node 2>/dev/null || true
sudo rm -f /usr/bin/npm 2>/dev/null || true
sudo rm -f /usr/local/bin/node 2>/dev/null || true
sudo rm -f /usr/local/bin/npm 2>/dev/null || true

# 3. Clean up alternative links
echo -e "${GREEN}[3/6] Cleaning up alternative links...${NC}"
sudo update-alternatives --remove-all node 2>/dev/null || true
sudo update-alternatives --remove-all npm 2>/dev/null || true

# 4. Reinstall Node.js 16
echo -e "${GREEN}[4/6] Installing Node.js 16...${NC}"
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 5. Verify Node.js installation
echo -e "${GREEN}[5/6] Verifying Node.js installation...${NC}"
echo "Node.js version:"
node --version
echo "npm version:"
npm --version
echo "Node.js path:"
which node
echo "npm path:"
which npm

# 6. Install PM2
echo -e "${GREEN}[6/6] Installing PM2...${NC}"
sudo npm install -g pm2@latest

# Verify PM2
pm2 --version

echo ""
echo -e "${GREEN}✅ Node.js and PM2 installation fixed!${NC}"
echo ""
echo "Verification:"
echo "  Node.js: $(node --version)"
echo "  npm: $(npm --version)"
echo "  PM2: $(pm2 --version)"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Setup PM2 startup: ${GREEN}pm2 startup systemd${NC}"
echo "2. Run the command it outputs"
echo "3. Continue with server setup"

