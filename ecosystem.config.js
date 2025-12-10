module.exports = {
  apps: [
    {
      name: 'passwall-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: './',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ],

  deploy: {
    production: {
      user: 'deploy',
      host: 'your-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:passwall/passwall-web.git',
      path: '/var/www/passwall-web',
      'pre-deploy-local': '',
      'post-deploy': 'npm ci --legacy-peer-deps && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}

