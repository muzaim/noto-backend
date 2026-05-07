import { SetMetadata } from '@nestjs/common';
import { AuditAction } from '../entities/audit-trail.entity';

export const AUDIT_METADATA_KEY = 'audit';

export interface AuditMetadata {
  tableName: string;
  action: AuditAction;
  description?: string;
  oldValues?: any;
}

export const Audit = (metadata: AuditMetadata) =>
  SetMetadata(AUDIT_METADATA_KEY, metadata);
