# GitHub Actions Workflows

This directory contains automated CI/CD workflows for Passwall Web.

## Workflows

### 1. `deploy.yml` - Production Deployment

**Trigger**: Push to `main` or `master` branch, or manual trigger

**What it does**:
1. ✅ Checks out code
2. ✅ Sets up Node.js 18
3. ✅ Installs dependencies
4. ✅ Builds Next.js app
5. ✅ Creates deployment package
6. ✅ Uploads to server via SSH
7. ✅ Backs up current version
8. ✅ Extracts new files
9. ✅ Installs production dependencies
10. ✅ Restarts PM2
11. ✅ Runs health check

**Duration**: ~3-5 minutes

### 2. `test.yml` - Build Testing

**Trigger**: Pull requests and pushes to non-main branches

**What it does**:
1. ✅ Checks out code
2. ✅ Sets up Node.js
3. ✅ Installs dependencies
4. ✅ Tests build process
5. ✅ Runs linting (optional)

**Duration**: ~2-3 minutes

## Deployment Flow

```
┌─────────────────┐
│  Developer      │
│  pushes code    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│ starts workflow │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Build Next.js  │
│  application    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Create tar.gz   │
│ package         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Transfer via    │
│ SSH to server   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Backup current  │
│ deployment      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Extract new     │
│ files           │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Install deps    │
│ npm ci          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ PM2 restart     │
│ passwall-web    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Health check    │
│ curl app        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ ✅ Deployment   │
│    Complete!    │
└─────────────────┘
```

## Required GitHub Secrets

| Secret | Description | Example |
|--------|-------------|---------|
| `SERVER_HOST` | Server IP or domain | `123.45.67.89` |
| `SERVER_USERNAME` | SSH username | `deploy` |
| `SSH_PRIVATE_KEY` | Private SSH key | `-----BEGIN RSA...` |
| `SERVER_PORT` | SSH port | `22` |
| `DEPLOY_PATH` | App directory | `/var/www/passwall-web` |
| `APP_URL` | App URL | `https://passwall.io` |

## Manual Trigger

To manually trigger a deployment:

1. Go to **Actions** tab in GitHub
2. Select **Build and Deploy to Server**
3. Click **Run workflow**
4. Select branch (usually `main`)
5. Click **Run workflow** button

## Monitoring

### View workflow runs
- GitHub → Actions tab → Select workflow

### View live logs
```bash
# SSH to server
ssh user@your-server

# View PM2 logs
pm2 logs passwall-web --lines 100
```

## Troubleshooting

### Deployment fails at SSH step
- Check `SSH_PRIVATE_KEY` secret is correct
- Verify server is reachable: `ssh user@server`
- Check GitHub Actions logs

### Build fails
- Check dependencies are up to date
- Verify Node version compatibility
- Review build logs in Actions

### Health check fails
- Verify app is running: `pm2 list`
- Check app URL is correct
- Review application logs

## Best Practices

1. **Always test in a staging environment first**
2. **Review changes before merging to main**
3. **Monitor the first few deployments closely**
4. **Keep backups** (automatic, last 5 kept)
5. **Use branch protection rules** for main branch

## Security Notes

- Never commit secrets to repository
- Use GitHub Secrets for sensitive data
- Rotate SSH keys periodically
- Keep server and dependencies updated
- Use SSL/TLS in production

## Need Help?

- Check [DEPLOYMENT.md](../../DEPLOYMENT.md) for detailed setup
- See [QUICKSTART.md](../../QUICKSTART.md) for quick setup
- Open an issue on GitHub

