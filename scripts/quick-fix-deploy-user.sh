#!/bin/bash

# Quick fix to create deploy user and setup directories
# Run this if you got "chown: invalid user: 'deploy:deploy'" error

set -e

echo "🔧 Quick fix: Creating deploy user and setting up directories..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

APP_USER="${APP_USER:-deploy}"
APP_DIR="${DEPLOY_PATH:-/var/www/passwall-web}"

# 1. Create deploy user
echo -e "${GREEN}[1/3] Creating user: $APP_USER${NC}"
if ! id "$APP_USER" &>/dev/null; then
    sudo useradd -m -s /bin/bash $APP_USER
    echo -e "${GREEN}✓ User $APP_USER created successfully${NC}"
else
    echo -e "${YELLOW}✓ User $APP_USER already exists${NC}"
fi

# 2. Create application directory
echo -e "${GREEN}[2/3] Creating application directory: $APP_DIR${NC}"
sudo mkdir -p $APP_DIR
sudo mkdir -p $APP_DIR/logs

# 3. Set correct ownership
echo -e "${GREEN}[3/3] Setting ownership to $APP_USER:$APP_USER${NC}"
sudo chown -R $APP_USER:$APP_USER $APP_DIR

echo ""
echo -e "${GREEN}✅ Fix completed!${NC}"
echo ""
echo "User info:"
id $APP_USER
echo ""
echo "Directory ownership:"
ls -ld $APP_DIR
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Switch to deploy user: ${GREEN}sudo su - $APP_USER${NC}"
echo "2. Setup SSH keys for GitHub Actions"
echo "3. Continue with server setup"

