module.exports = {
    apps: [
        {
            name: 'genergy-spider-schedule',
            script: './dist/main.js',
            watch: true,
            watch_ignore: ['./node_modules', './logs'],
            // 开发环境
            env_development: {
                NODE_ENV: 'development',
                NODE_APP_INSTANCE: 'development',
            },
            // 测试环境
            env_test: {
                NODE_ENV: 'test',
                NODE_APP_INSTANCE: 'test',
            },
            // 预发环境
            env_pretest: {
                NODE_ENV: 'pretest',
                NODE_APP_INSTANCE: 'pretest',
            },
            // 生产环境
            env_production: {
                NODE_ENV: 'production',
                NODE_APP_INSTANCE: 'production',
            },
        },
    ],
};
