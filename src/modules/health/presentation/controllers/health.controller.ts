import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'Health Service',
      timestamp: new Date().toISOString(),
    };
  }
}
