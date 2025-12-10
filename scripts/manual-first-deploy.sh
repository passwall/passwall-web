#!/bin/bash

# Manual first deployment script
# Run this on your server to deploy the app for the first time

set -e

echo "🚀 Manual First Deployment of Passwall Web..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
APP_DIR="${DEPLOY_PATH:-/var/www/passwall-web}"
REPO_URL="${REPO_URL:-https://github.com/passwall/passwall-web.git}"

echo -e "${YELLOW}Configuration:${NC}"
echo "  App Directory: $APP_DIR"
echo "  Repository: $REPO_URL"
echo ""

# Check if we're running as deploy user
CURRENT_USER=$(whoami)
if [ "$CURRENT_USER" != "deploy" ]; then
    echo -e "${YELLOW}⚠️  You should run this as the deploy user${NC}"
    echo -e "${YELLOW}   Switching to deploy user...${NC}"
    sudo su - deploy -c "bash -s" << 'DEPLOY_SCRIPT'
#!/bin/bash

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

APP_DIR="/var/www/passwall-web"
REPO_URL="https://github.com/passwall/passwall-web.git"

echo -e "${GREEN}[1/7] Cloning repository to temporary directory...${NC}"
cd /tmp
rm -rf passwall-web-deploy
git clone $REPO_URL passwall-web-deploy
cd passwall-web-deploy

echo -e "${GREEN}[2/7] Installing dependencies...${NC}"
npm install --legacy-peer-deps

echo -e "${GREEN}[3/7] Building Next.js application...${NC}"
npm run build

echo -e "${GREEN}[4/7] Copying files to app directory...${NC}"
cp -r .next $APP_DIR/
cp -r public $APP_DIR/
cp -r pages $APP_DIR/
cp -r components $APP_DIR/
cp -r styles $APP_DIR/
cp -r constants $APP_DIR/
cp -r store $APP_DIR/
cp package*.json $APP_DIR/
cp next.config.js $APP_DIR/
cp postcss.config.js $APP_DIR/
cp site.config.js $APP_DIR/
cp api.js $APP_DIR/
cp ecosystem.config.js $APP_DIR/

echo -e "${GREEN}[5/7] Installing production dependencies...${NC}"
cd $APP_DIR
npm ci --production --legacy-peer-deps

echo -e "${GREEN}[6/7] Starting application with PM2...${NC}"
pm2 delete passwall-web 2>/dev/null || true
pm2 start ecosystem.config.js --env production

echo -e "${GREEN}[7/7] Saving PM2 process list...${NC}"
pm2 save

echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "Application status:"
pm2 list
echo ""
echo "View logs:"
echo "  pm2 logs passwall-web"
echo ""
echo "Test the application:"
echo "  curl http://localhost:3000"

DEPLOY_SCRIPT
    exit 0
fi

# If we're already deploy user, run directly
echo -e "${GREEN}[1/7] Cloning repository to temporary directory...${NC}"
cd /tmp
rm -rf passwall-web-deploy
git clone $REPO_URL passwall-web-deploy
cd passwall-web-deploy

echo -e "${GREEN}[2/7] Installing dependencies...${NC}"
npm install --legacy-peer-deps

echo -e "${GREEN}[3/7] Building Next.js application...${NC}"
npm run build

echo -e "${GREEN}[4/7] Copying files to app directory...${NC}"
cp -r .next $APP_DIR/
cp -r public $APP_DIR/
cp -r pages $APP_DIR/
cp -r components $APP_DIR/
cp -r styles $APP_DIR/
cp -r constants $APP_DIR/
cp -r store $APP_DIR/
cp package*.json $APP_DIR/
cp next.config.js $APP_DIR/
cp postcss.config.js $APP_DIR/
cp site.config.js $APP_DIR/
cp api.js $APP_DIR/
cp ecosystem.config.js $APP_DIR/

echo -e "${GREEN}[5/7] Installing production dependencies...${NC}"
cd $APP_DIR
npm ci --production --legacy-peer-deps

echo -e "${GREEN}[6/7] Starting application with PM2...${NC}"
pm2 delete passwall-web 2>/dev/null || true
pm2 start ecosystem.config.js --env production

echo -e "${GREEN}[7/7] Saving PM2 process list...${NC}"
pm2 save

echo ""
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "Application status:"
pm2 list
echo ""
echo "View logs:"
echo "  pm2 logs passwall-web"
echo ""
echo "Test the application:"
echo "  curl http://localhost:3000"

