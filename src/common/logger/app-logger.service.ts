import { Injectable, Scope } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private contextName?: string;

  constructor(@InjectPinoLogger() protected readonly pinoLogger: PinoLogger) {}

  log(message: string, context?: string): void {
    this.pinoLogger.info({ context: context || this.contextName }, message);
  }

  info(message: string, context?: string): void {
    this.pinoLogger.info({ context: context || this.contextName }, message);
  }

  debug(message: string, context?: string): void {
    this.pinoLogger.debug({ context: context || this.contextName }, message);
  }

  warn(message: string, context?: string): void {
    this.pinoLogger.warn({ context: context || this.contextName }, message);
  }

  error(message: string, trace?: string | object, context?: string): void {
    if (typeof trace === 'object') {
      this.pinoLogger.error(
        { err: trace, context: context || this.contextName },
        message,
      );
    } else {
      this.pinoLogger.error(
        { stack: trace, context: context || this.contextName },
        message,
      );
    }
  }

  setContext(context: string): void {
    this.contextName = context;
  }
}
