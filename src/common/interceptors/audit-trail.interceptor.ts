import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { DataSource, EntityTarget } from 'typeorm';
import { AuditTrailService } from '../services/audit-trail.service';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { AUDIT_METADATA_KEY } from '../decorators/audit.decorator';
import { AuditAction } from '../entities/audit-trail.entity';
import { AppLogger } from '../logger/app-logger.service';
import { ReligionEntity } from 'src/master-data/religions/entities/religion.entity';

@Injectable()
export class AuditTrailInterceptor implements NestInterceptor {
  private readonly entityMap: Map<string, EntityTarget<any>>;

  constructor(
    private readonly auditService: AuditTrailService,
    private readonly reflector: Reflector,
    private readonly dataSource: DataSource,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AuditTrailInterceptor.name);
    // Inisialisasi Map di dalam constructor untuk menghindari error tipe
    // saat deklarasi.
    this.entityMap = new Map<string, EntityTarget<any>>();
    this.entityMap.set('mst_religions', ReligionEntity);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const auditMetadata = this.reflector.get(
      AUDIT_METADATA_KEY,
      context.getHandler(),
    );

    if (!auditMetadata) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    let oldData: any = null;
    let recordId: number | null = null;

    if (request.params && request.params.id) {
      recordId = parseInt(request.params.id);
    }

    const isUpdateOrDelete =
      auditMetadata.action === AuditAction.UPDATE ||
      auditMetadata.action === AuditAction.DELETE;

    const findOldData = async () => {
      if (isUpdateOrDelete && recordId) {
        const entityClass = this.entityMap.get(auditMetadata.tableName);
        if (entityClass) {
          const repository = this.dataSource.getRepository(entityClass);
          return await repository.findOne({ where: { id: recordId } });
        }
      }
      return null;
    };

    if (isUpdateOrDelete) {
      findOldData()
        .then((data) => {
          oldData = data;
        })
        .catch((error) => {
          this.logger.error(
            '[AuditTrailInterceptor] Error fetching old data for audit',
            error instanceof Error ? error.stack : String(error),
          );
        });
    }

    return next.handle().pipe(
      tap(async (responseData) => {
        try {
          if (auditMetadata.action === AuditAction.CREATE) {
            recordId = responseData?.data?.id || null;
          }

          let newValues: any = null;
          if (
            auditMetadata.action === AuditAction.CREATE ||
            auditMetadata.action === AuditAction.UPDATE
          ) {
            newValues = request.body;
          } else if (auditMetadata.action === AuditAction.LOGIN) {
            newValues = responseData;
          } else {
            newValues = responseData;
          }

          // await this.auditService.createAuditLog({
          //   user_id: user?.id,
          //   username: user?.username,
          //   table_name: auditMetadata.tableName,
          //   record_id: recordId,
          //   action: auditMetadata.action,
          //   old_values: oldData ? JSON.stringify(oldData) : null,
          //   new_values: newValues ? JSON.stringify(newValues) : null,
          //   ip_address: request.ip,
          //   user_agent: request.get('User-Agent'),
          //   description: auditMetadata.description,
          // });
          await this.auditService.createAuditLog({
            user_id: user?.userId,

            username: user?.username,

            table_name: auditMetadata.tableName,

            record_id: recordId,

            action: auditMetadata.action,

            old_values: oldData ? JSON.stringify(oldData) : null,

            new_values: newValues ? JSON.stringify(newValues) : null,

            ip_address: request.ip,

            user_agent: request.get('User-Agent'),

            description: auditMetadata.description,
          });
        } catch (error) {
          this.logger.error(
            '[AuditTrailInterceptor] Failed to save audit trail log',
            error instanceof Error ? error.stack : String(error),
          );
        }
      }),
    );
  }
}
