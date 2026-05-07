import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  ExceptionFilter,
} from '@nestjs/common';
import { AppLogger } from '../logger/app-logger.service';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext(AllExceptionsFilter.name);
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    let responseBody: any;

    // Handle custom exceptions (BusinessLogicException, ValidationException)
    if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'errorType' in exceptionResponse
    ) {
      // Custom exception with preserved context
      responseBody = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      // Standard HttpException
      const message = (exceptionResponse as any).message;
      responseBody = {
        success: false,
        status_code: httpStatus,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: Array.isArray(message) ? message : message,
      };
    } else if (typeof exceptionResponse === 'string') {
      responseBody = {
        success: false,
        status_code: httpStatus,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exceptionResponse,
      };
    } else {
      // Fallback for unexpected error types
      responseBody = {
        success: false,
        status_code: httpStatus,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'An unexpected error occurred',
      };
    }

    // Log error details structured for Pino
    const errorMessage = `${request.method} ${request.url} ${httpStatus}`;
    const errorContext = {
      method: request.method,
      url: request.url,
      status_code: httpStatus,
      userAgent: request.get('user-agent'),
      ip: request.ip,
    };

    if (httpStatus >= 500) {
      this.logger.error(
        errorMessage,
        (exception instanceof Error ? exception.stack : (exception as any)) as
          | string
          | object,
      );
    } else {
      this.logger.warn(errorMessage);
    }

    response.status(httpStatus).json(responseBody);
  }
}
