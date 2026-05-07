import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditTrail } from './entities/audit-trail.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditTrailService } from './services/audit-trail.service';
import { AuditTrailInterceptor } from './interceptors/audit-trail.interceptor';
import { AppLogger } from './logger/app-logger.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AuditTrail])],
  providers: [
    AuditTrailService,
    AppLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditTrailInterceptor,
    },
  ],
  exports: [AuditTrailService, AppLogger],
})
export class CommonModule {}
