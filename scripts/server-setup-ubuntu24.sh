#!/bin/bash

# Passwall Web Server Setup Script for Ubuntu 24.04
# Uses Node.js 20 (latest LTS)

set -e

echo "🚀 Starting Passwall Web Server Setup (Ubuntu 24.04)..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="${DEPLOY_PATH:-/var/www/passwall-web}"
APP_USER="${APP_USER:-deploy}"
NODE_VERSION="${NODE_VERSION:-20}"  # Use Node.js 20 for Ubuntu 24.04

echo -e "${YELLOW}Configuration:${NC}"
echo "  Ubuntu Version: 24.04"
echo "  App Directory: $APP_DIR"
echo "  App User: $APP_USER"
echo "  Node Version: $NODE_VERSION"
echo ""

# Fix repository issues first
echo -e "${GREEN}[1/10] Fixing repository issues...${NC}"
sudo rm -f /etc/apt/sources.list.d/pgdg.list 2>/dev/null || true
sudo rm -f /etc/apt/sources.list.d/postgresql.list 2>/dev/null || true

# Update system packages
echo -e "${GREEN}[2/10] Updating system packages...${NC}"
sudo apt-get clean
sudo apt-get update
sudo apt-get upgrade -y

# Install required dependencies
echo -e "${GREEN}[3/10] Installing required dependencies...${NC}"
sudo apt-get install -y curl wget git build-essential

# Create application user FIRST (before anything else)
echo -e "${GREEN}[4/10] Creating application user: $APP_USER${NC}"
if ! id "$APP_USER" &>/dev/null; then
    sudo useradd -m -s /bin/bash $APP_USER
    echo -e "${GREEN}✓ User $APP_USER created${NC}"
else
    echo -e "${YELLOW}✓ User $APP_USER already exists${NC}"
fi

# Remove old Node.js and PM2 completely
echo -e "${GREEN}[5/10] Removing old Node.js and PM2 versions...${NC}"
sudo npm uninstall -g pm2 2>/dev/null || true
sudo rm -f /usr/local/bin/pm2 /usr/bin/pm2 2>/dev/null || true
sudo rm -rf /usr/local/lib/node_modules/pm2 2>/dev/null || true
sudo apt-get remove -y --purge nodejs npm 2>/dev/null || true
sudo apt-get autoremove -y

# Install Node.js 20
echo -e "${GREEN}[6/10] Installing Node.js ${NODE_VERSION}...${NC}"
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
echo -e "${GREEN}[7/10] Verifying Node.js and npm installation...${NC}"
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo "Node.js path: $(which node)"
echo "npm path: $(which npm)"

# Install PM2 globally
echo -e "${GREEN}[8/10] Installing PM2 globally...${NC}"
sudo npm install -g pm2@latest

# Verify PM2 installation
echo "PM2 version: $(pm2 --version)"

# Setup PM2 startup script (as the deploy user)
echo -e "${GREEN}[9/10] Setting up PM2 startup script for user $APP_USER...${NC}"
sudo -u $APP_USER bash -c "pm2 startup systemd" || true
# Note: The command above will output a command that needs to be run with sudo
# We'll capture and execute it
PM2_STARTUP_CMD=$(sudo -u $APP_USER bash -c "pm2 startup systemd -u $APP_USER --hp /home/$APP_USER" | grep "sudo env" || true)
if [ ! -z "$PM2_STARTUP_CMD" ]; then
    echo "Executing: $PM2_STARTUP_CMD"
    eval $PM2_STARTUP_CMD
fi

# Create application directory with correct ownership
echo -e "${GREEN}[10/10] Creating application directory...${NC}"
sudo mkdir -p $APP_DIR
sudo mkdir -p $APP_DIR/logs

# NOW set ownership (user exists now)
echo "Setting ownership to $APP_USER:$APP_USER"
sudo chown -R $APP_USER:$APP_USER $APP_DIR
echo -e "${GREEN}✓ Directory created and owned by $APP_USER${NC}"

# Install Nginx (optional, for reverse proxy)
echo ""
read -p "Do you want to install Nginx as reverse proxy? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Installing and configuring Nginx...${NC}"
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
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

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

    # Serve public files directly
    location /images/ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
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
    echo ""
    echo -e "${YELLOW}To enable SSL with Let's Encrypt:${NC}"
    echo "  sudo apt-get install certbot python3-certbot-nginx"
    echo "  sudo certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME}"
else
    echo -e "${YELLOW}Skipping Nginx installation${NC}"
fi

# Setup firewall
echo ""
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
echo -e "${YELLOW}📋 Next steps:${NC}"
echo ""
echo "1. Switch to deploy user and setup SSH keys:"
echo "   ${GREEN}sudo su - $APP_USER${NC}"
echo "   ${GREEN}ssh-keygen -t rsa -b 4096 -C 'github-deploy' -f ~/.ssh/passwall_deploy${NC}"
echo "   ${GREEN}cat ~/.ssh/passwall_deploy.pub >> ~/.ssh/authorized_keys${NC}"
echo "   ${GREEN}chmod 700 ~/.ssh${NC}"
echo "   ${GREEN}chmod 600 ~/.ssh/authorized_keys${NC}"
echo ""
echo "2. Display private key (copy this for GitHub Secret):"
echo "   ${GREEN}cat ~/.ssh/passwall_deploy${NC}"
echo ""
echo "3. Configure GitHub Secrets in your repository:"
echo "   SERVER_HOST = $(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
echo "   SERVER_USERNAME = $APP_USER"
echo "   SSH_PRIVATE_KEY = (paste the private key from step 2)"
echo "   SERVER_PORT = 22"
echo "   DEPLOY_PATH = $APP_DIR"
echo "   APP_URL = http://$(curl -s ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
echo ""
echo "4. Update GitHub Actions workflow to use Node.js 20:"
echo "   Edit .github/workflows/deploy.yml and test.yml"
echo "   Change node-version to '20'"
echo ""
echo "5. Test deployment:"
echo "   ${GREEN}git push origin main${NC}"
echo ""
echo -e "${GREEN}Happy deploying! 🚀${NC}"

