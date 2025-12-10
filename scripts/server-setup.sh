#!/bin/bash

# Passwall Web Server Setup Script
# This script sets up the server environment for Passwall Web deployment

set -e

echo "🚀 Starting Passwall Web Server Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="${DEPLOY_PATH:-/var/www/passwall-web}"
APP_USER="${APP_USER:-deploy}"
NODE_VERSION="${NODE_VERSION:-18}"

echo -e "${YELLOW}Configuration:${NC}"
echo "  App Directory: $APP_DIR"
echo "  App User: $APP_USER"
echo "  Node Version: $NODE_VERSION"
echo ""

# Update system packages
echo -e "${GREEN}[1/8] Updating system packages...${NC}"
sudo apt-get update
sudo apt-get upgrade -y

# Install Node.js
echo -e "${GREEN}[2/8] Installing Node.js ${NODE_VERSION}...${NC}"
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
echo -e "${GREEN}[3/8] Verifying Node.js and npm installation...${NC}"
node --version
npm --version

# Install PM2 globally
echo -e "${GREEN}[4/8] Installing PM2 globally...${NC}"
sudo npm install -g pm2

# Setup PM2 startup script
echo -e "${GREEN}[5/8] Setting up PM2 startup script...${NC}"
sudo pm2 startup systemd -u $APP_USER --hp /home/$APP_USER

# Create application directory
echo -e "${GREEN}[6/8] Creating application directory...${NC}"
sudo mkdir -p $APP_DIR
sudo mkdir -p $APP_DIR/logs
sudo chown -R $APP_USER:$APP_USER $APP_DIR

# Install Nginx (optional, for reverse proxy)
read -p "Do you want to install Nginx as reverse proxy? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}[7/8] Installing and configuring Nginx...${NC}"
    sudo apt-get install -y nginx
    
    # Create Nginx configuration
    sudo tee /etc/nginx/sites-available/passwall-web > /dev/null <<EOF
server {
    listen 80;
    server_name passwall.io www.passwall.io;

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
    }
}
EOF
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/passwall-web /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    echo -e "${GREEN}Nginx installed and configured!${NC}"
    echo -e "${YELLOW}Don't forget to configure SSL with Let's Encrypt:${NC}"
    echo "  sudo apt-get install certbot python3-certbot-nginx"
    echo "  sudo certbot --nginx -d passwall.io -d www.passwall.io"
else
    echo -e "${YELLOW}[7/8] Skipping Nginx installation${NC}"
fi

# Setup firewall
echo -e "${GREEN}[8/8] Configuring firewall...${NC}"
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo ""
echo -e "${GREEN}✅ Server setup completed!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Add your SSH public key to ~/.ssh/authorized_keys"
echo "2. Configure GitHub Secrets in your repository:"
echo "   - SERVER_HOST: Your server IP or domain"
echo "   - SERVER_USERNAME: $APP_USER"
echo "   - SSH_PRIVATE_KEY: Your private SSH key"
echo "   - DEPLOY_PATH: $APP_DIR"
echo "   - SERVER_PORT: 22 (or your SSH port)"
echo "   - APP_URL: https://passwall.io"
echo "3. Push to main/master branch to trigger deployment"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"

