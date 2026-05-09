import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditAction, AuditTrail } from '../entities/audit-trail.entity';
import { Repository } from 'typeorm';

export interface CreateAuditLogDto {
  user_id?: number;
  username?: string;
  table_name: string;
  record_id?: number;
  action: AuditAction;
  old_values?: string;
  new_values?: string;
  ip_address?: string;
  user_agent?: string;
  description?: string;
}

@Injectable()
export class AuditTrailService {
  constructor(
    @InjectRepository(AuditTrail)
    private readonly auditRepository: Repository<AuditTrail>,
  ) {}

  async createAuditLog(data: CreateAuditLogDto): Promise<AuditTrail> {
    const audit = this.auditRepository.create(data);
    return this.auditRepository.save(audit);
  }

  async findAll(page = 1, limit = 10) {
    const [data, total] = await this.auditRepository.findAndCount({
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByUser(userId: number, page = 1, limit = 10) {
    const [data, total] = await this.auditRepository.findAndCount({
      where: {
        user_id: userId,
      },

      relations: ['user'],

      order: {
        created_at: 'DESC',
      },

      skip: (page - 1) * limit,

      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByTable(tableName: string, page = 1, limit = 10) {
    const [data, total] = await this.auditRepository.findAndCount({
      where: { table_name: tableName },
      order: { created_at: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
