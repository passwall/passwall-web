#!/bin/bash

# Install Node.js using NVM (Node Version Manager)
# This works on any Ubuntu version, including 18.04

set -e

echo "🚀 Installing Node.js via NVM..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

NODE_VERSION="${NODE_VERSION:-18}"

echo -e "${YELLOW}This will install Node.js ${NODE_VERSION} using NVM${NC}"
echo ""

# Install NVM
echo -e "${GREEN}[1/4] Installing NVM...${NC}"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Verify NVM installation
echo -e "${GREEN}[2/4] Verifying NVM installation...${NC}"
nvm --version

# Install Node.js
echo -e "${GREEN}[3/4] Installing Node.js ${NODE_VERSION}...${NC}"
nvm install ${NODE_VERSION}
nvm use ${NODE_VERSION}
nvm alias default ${NODE_VERSION}

# Verify Node.js installation
echo -e "${GREEN}[4/4] Verifying Node.js installation...${NC}"
node --version
npm --version

# Add NVM to shell profile
echo ""
echo -e "${GREEN}✅ Node.js ${NODE_VERSION} installed successfully via NVM!${NC}"
echo ""
echo -e "${YELLOW}To use Node.js in new terminal sessions, add this to your ~/.bashrc:${NC}"
echo ""
echo 'export NVM_DIR="$HOME/.nvm"'
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"'
echo ""
echo -e "${YELLOW}Or run this command:${NC}"
echo 'cat >> ~/.bashrc << '\''EOF'\''
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
EOF'
echo ""
echo "Then run: source ~/.bashrc"
echo ""
echo -e "${GREEN}Now you can install PM2 globally:${NC}"
echo "npm install -g pm2"

