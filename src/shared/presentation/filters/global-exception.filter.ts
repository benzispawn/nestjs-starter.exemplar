import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Logger,
  Catch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from '../../domain/errors/domain.error';

const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let code = 'INTERNAL_SERVER_ERROR';

    if (exception instanceof DomainError) {
      statusCode = HTTP_STATUS.BAD_REQUEST;
      message = exception.message;
      code = exception.code;
    } else if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const msg = (exceptionResponse as { message?: string | string[] })
          .message;
        message = msg ?? message;
      }

      code = this.mapHttpStatusToCode(statusCode);
    }

    if (statusCode >= 500) {
      this.logger.error(
        `[${request.method}] ${request.url}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.logger.warn(`[${request.method}] ${request.url} -> ${statusCode}`);
    }

    response.status(statusCode).json({
      message,
      code,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private mapHttpStatusToCode(statusCode: number): string {
    switch (statusCode) {
      case HTTP_STATUS.BAD_REQUEST:
        return 'BAD_REQUEST';
      case HTTP_STATUS.UNAUTHORIZED:
        return 'UNAUTHORIZED';
      case HTTP_STATUS.FORBIDDEN:
        return 'FORBIDDEN';
      case HTTP_STATUS.NOT_FOUND:
        return 'NOT_FOUND';
      case HTTP_STATUS.CONFLICT:
        return 'CONFLICT';
      default:
        return 'HTTP_EXCEPTION';
    }
  }
}
