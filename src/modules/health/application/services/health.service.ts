import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 'ok',
      service: 'Health Service',
      timestamp: new Date().toISOString(),
    };
  }
}
