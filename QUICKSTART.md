# 🚀 Quick Start - Automated Deployment

Get your Passwall website automatically deployed in 3 steps!

## Step 1: Server Setup (One-time)

SSH into your server and run:

```bash
# Download and run the setup script
curl -o- https://raw.githubusercontent.com/passwall/passwall-web/main/scripts/server-setup.sh | bash
```

Or clone the repo and run locally:
```bash
git clone https://github.com/passwall/passwall-web.git
cd passwall-web
chmod +x scripts/server-setup.sh
./scripts/server-setup.sh
```

## Step 2: Configure GitHub Secrets

Go to your GitHub repository:
**Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these 6 secrets:

```
SERVER_HOST       = your-server-ip-or-domain
SERVER_USERNAME   = deploy
SSH_PRIVATE_KEY   = your-ssh-private-key
SERVER_PORT       = 22
DEPLOY_PATH       = /var/www/passwall-web
APP_URL           = https://passwall.io
```

### How to get SSH_PRIVATE_KEY:

```bash
# Generate new SSH key
ssh-keygen -t rsa -b 4096 -C "github-deploy" -f ~/.ssh/passwall_deploy

# Add public key to server
ssh-copy-id -i ~/.ssh/passwall_deploy.pub user@your-server

# Copy private key (paste this in GitHub Secret)
cat ~/.ssh/passwall_deploy
```

## Step 3: Deploy!

Just push to main branch:

```bash
git add .
git commit -m "Initial deployment setup"
git push origin main
```

✅ **That's it!** GitHub Actions will automatically build and deploy your app.

## Monitor Deployment

- **GitHub**: Check Actions tab for deployment progress
- **Server**: `ssh user@server && pm2 logs passwall-web`

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed documentation.

---

**Quick Commands:**

```bash
# Check app status
pm2 list

# View logs
pm2 logs passwall-web

# Restart app
pm2 restart passwall-web

# Manual deploy (from local)
pm2 deploy production
```

