import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { validateEnv } from './shared/infra/config/env.validation';
import appConfig from './shared/infra/config/app.config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateEnv,
    }),
    HealthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
