import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { validateEnv } from './shared/infra/config/env.validation';
import appConfig from './shared/infra/config/app.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateEnv,
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
