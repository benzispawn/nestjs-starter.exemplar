export default () => ({
  app: {
    name: process.env.APP_NAME ?? 'nestjs-starter-exemplar',
    port: Number(process.env.PORT ?? 3000),
    globalPrefix: process.env.GLOBAL_PREFIX ?? 'api',
    nodeEnv: process.env.NODE_ENV ?? 'development',
  },
});
