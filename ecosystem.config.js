module.exports = {
  apps: [
    {
      name: 'web-app',
      script: './node_modules/.bin/next',
      exec_mode: 'cluster',
      instances: 1,
      max_memory_restart: '512M',
      ignore_watch: ['node_modules'],
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--unhandled-rejections=warn',
      },
    },
  ],
};
