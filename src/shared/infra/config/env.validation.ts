import { plainToInstance } from 'class-transformer';
import {
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariable {
  @IsOptional()
  @IsString()
  APP_NAME?: string;

  @IsOptional()
  @IsNumberString()
  PORT?: string;

  @IsOptional()
  @IsString()
  GLOBAL_PREFIX?: string;

  @IsOptional()
  @IsIn(['development', 'test', 'production'])
  NODE_ENV?: 'development' | 'test' | 'production';
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariable, config, {
    enableImplicitConversion: false,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
