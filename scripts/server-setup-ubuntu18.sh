#!/bin/bash

# Passwall Web Server Setup Script for Ubuntu 18.04
# Uses Node.js 16 (compatible with Ubuntu 18.04)

set -e

echo "🚀 Starting Passwall Web Server Setup (Ubuntu 18.04 compatible)..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration - Use Node.js 16 for Ubuntu 18.04 compatibility
APP_DIR="${DEPLOY_PATH:-/var/www/passwall-web}"
APP_USER="${APP_USER:-deploy}"
NODE_VERSION="16"  # Compatible with Ubuntu 18.04

echo -e "${YELLOW}Configuration:${NC}"
echo "  App Directory: $APP_DIR"
echo "  App User: $APP_USER"
echo "  Node Version: $NODE_VERSION (Ubuntu 18.04 compatible)"
echo ""
echo -e "${YELLOW}⚠️  Note: Using Node.js 16 due to Ubuntu 18.04 limitations${NC}"
echo -e "${YELLOW}    Consider upgrading to Ubuntu 20.04 or 22.04 for Node.js 18+${NC}"
echo ""

# Fix repository issues first
echo -e "${GREEN}[0/9] Fixing repository issues...${NC}"
sudo rm -f /etc/apt/sources.list.d/pgdg.list 2>/dev/null || true
sudo rm -f /etc/apt/sources.list.d/postgresql.list 2>/dev/null || true

# Update system packages
echo -e "${GREEN}[1/9] Updating system packages...${NC}"
sudo apt-get clean
sudo apt-get update || {
    echo -e "${YELLOW}Warning: apt update had some errors, but continuing...${NC}"
}
sudo apt-get upgrade -y

# Install required dependencies
echo -e "${GREEN}[2/9] Installing required dependencies...${NC}"
sudo apt-get install -y curl wget git build-essential

# Remove old Node.js if exists
echo -e "${GREEN}[3/9] Removing old Node.js versions...${NC}"
sudo apt-get remove -y nodejs npm 2>/dev/null || true

# Install Node.js 16 (compatible with Ubuntu 18.04)
echo -e "${GREEN}[4/9] Installing Node.js ${NODE_VERSION}...${NC}"
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
echo -e "${GREEN}[5/9] Verifying Node.js and npm installation...${NC}"
node --version
npm --version

# Install PM2 globally
echo -e "${GREEN}[6/9] Installing PM2 globally...${NC}"
sudo npm install -g pm2@latest

# Verify PM2 installation
pm2 --version

# Create application user if doesn't exist
if ! id "$APP_USER" &>/dev/null; then
    echo -e "${GREEN}Creating application user: $APP_USER${NC}"
    sudo useradd -m -s /bin/bash $APP_USER
fi

# Setup PM2 startup script
echo -e "${GREEN}[7/9] Setting up PM2 startup script...${NC}"
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $APP_USER --hp /home/$APP_USER || true

# Create application directory
echo -e "${GREEN}[8/9] Creating application directory...${NC}"
sudo mkdir -p $APP_DIR
sudo mkdir -p $APP_DIR/logs
sudo chown -R $APP_USER:$APP_USER $APP_DIR

# Install Nginx (optional, for reverse proxy)
read -p "Do you want to install Nginx as reverse proxy? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}[9/9] Installing and configuring Nginx...${NC}"
    sudo apt-get install -y nginx
    
    # Ask for domain name
    read -p "Enter your domain name (e.g., passwall.io): " DOMAIN_NAME
    DOMAIN_NAME=${DOMAIN_NAME:-passwall.io}
    
    # Create Nginx configuration
    sudo tee /etc/nginx/sites-available/passwall-web > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN_NAME} www.${DOMAIN_NAME};

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/passwall-web-access.log;
    error_log /var/log/nginx/passwall-web-error.log;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static assets
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, max-age=3600, immutable";
    }
}
EOF
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/passwall-web /etc/nginx/sites-enabled/
    
    # Remove default site
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test and restart Nginx
    sudo nginx -t && sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    echo -e "${GREEN}✅ Nginx installed and configured!${NC}"
else
    echo -e "${YELLOW}[9/9] Skipping Nginx installation${NC}"
fi

# Setup firewall
echo -e "${GREEN}Configuring firewall (UFW)...${NC}"
sudo apt-get install -y ufw
sudo ufw --force reset
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw --force enable

echo ""
echo -e "${GREEN}════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Server setup completed successfully!${NC}"
echo -e "${GREEN}════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}⚠️  Important: You are using Node.js 16${NC}"
echo -e "${YELLOW}    Node.js 18 requires Ubuntu 20.04+${NC}"
echo -e "${YELLOW}    Consider upgrading your OS for better support${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo ""
echo "1. Generate SSH key for GitHub Actions:"
echo "   ${GREEN}ssh-keygen -t rsa -b 4096 -C 'github-deploy' -f ~/.ssh/passwall_deploy${NC}"
echo "   ${GREEN}cat ~/.ssh/passwall_deploy.pub >> ~/.ssh/authorized_keys${NC}"
echo ""
echo "2. Copy private key for GitHub Secret:"
echo "   ${GREEN}cat ~/.ssh/passwall_deploy${NC}"
echo ""
echo "3. Configure GitHub Secrets:"
echo "   SERVER_HOST = $(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
echo "   SERVER_USERNAME = $APP_USER"
echo "   SSH_PRIVATE_KEY = (paste the private key from step 2)"
echo "   SERVER_PORT = 22"
echo "   DEPLOY_PATH = $APP_DIR"
echo "   APP_URL = http://$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
echo ""
echo "4. Update GitHub Actions workflow to use Node.js 16:"
echo "   Edit .github/workflows/deploy.yml"
echo "   Change 'node-version: 18' to 'node-version: 16'"
echo ""
echo "5. Test deployment:"
echo "   ${GREEN}git push origin main${NC}"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"

