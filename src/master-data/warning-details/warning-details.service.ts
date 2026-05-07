import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { WarningDetailEntity } from './entities/warning-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { EntityManager, Repository } from 'typeorm';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { UpdateWarningDetailDto } from './dto/update-warning-detail.dto';
import { ActiveStatus } from 'src/database/enumlist';

@Injectable()
export class WarningDetailsService extends BaseService<WarningDetailEntity> {
  constructor(
    @InjectRepository(WarningDetailEntity)
    private readonly warningDetailRepo: Repository<WarningDetailEntity>,
    protected readonly logger: AppLogger,
  ) {
    super(warningDetailRepo, logger);
    this.logger.setContext(WarningDetailsService.name);
  }

  async findAll(query: GetTableDto): Promise<any> {
    this.logger.log('Fetching warning details with relations and filters');
    const { page, limit, sort_by, order_by, term } = query;

    const limitValue = Number(limit) || 10;
    const offset = ((Number(page) || 1) - 1) * limitValue;

    const queryBuilder = this.warningDetailRepo
      .createQueryBuilder('detail')
      // Join ke komponen gaji dan master data peringatan
      .leftJoinAndSelect('detail.payroll_component', 'payroll_component')
      .leftJoinAndSelect('detail.warning_master_data', 'warning_master_data')
      .leftJoinAndSelect('warning_master_data.warning_type', 'warning_type')
      // Memastikan hanya mengambil data yang belum dihapus (Soft Delete)
      .where('detail.deletedAt IS NULL');

    if (term) {
      queryBuilder.andWhere(
        '(payroll_component.component_name ILIKE :term OR warning_type.warning_type ILIKE :term)',
        { term: `%${term}%` },
      );
    }

    // Penanganan sorting
    let sortColumn = `detail.${sort_by || 'id'}`;

    if (sort_by === 'component_name') {
      sortColumn = 'payroll_component.component_name';
    } else if (sort_by === 'warning_type') {
      sortColumn = 'warning_type.warning_type';
    }

    const [data, total] = await queryBuilder
      .orderBy(sortColumn, (order_by || 'ASC').toUpperCase() as any)
      .take(limitValue)
      .skip(offset)
      .getManyAndCount();

    return {
      data,
      meta: {
        total_items: total,
        current_page: Number(page) || 1,
        per_page: limitValue,
        total_pages: Math.ceil(total / limitValue),
      },
    };
  }

  async updatebulkWarningDetails(
  warningId: number,
  payload: UpdateWarningDetailDto[],
  userId: string,
  manager?: EntityManager,
) {
  this.logger.log(
    `[updatebulkWarningDetails] Updating bulk details for warning id: ${warningId}`,
  );

  const repo = manager ? manager.getRepository(WarningDetailEntity) : this.repository;

  // 1. Get existing details
  const existingDetails = await repo.find({
    where: { warning_master_data: { id: warningId } },
  });

  // 2. Build map untuk pengecekan cepat (pake payroll_component_id sebagai key)
  const payloadMap = new Map(
    payload
      .filter((p) => p.payroll_component_id)
      .map((p) => [p.payroll_component_id, p]),
  );

  // 3. Deactivate yang tidak ada di payload baru
  const idsToDeactivate = existingDetails
    .filter((detail) => !payloadMap.has(detail.payroll_component_id))
    .map((detail) => detail.id);

  if (idsToDeactivate.length > 0) {
    await repo.update(idsToDeactivate, {
      status: ActiveStatus.Inactive,
      updatedBy: userId,
    });
    this.logger.log(`[updatebulkWarningDetails] Deactivated ${idsToDeactivate.length} details.`);
  }

  // 4. Process (Update existing / Create new)
  const processedDetails = await Promise.all(
    payload.map(async (data) => {
      if (!data.payroll_component_id) return null;

      const existing = existingDetails.find(
        (d) => d.payroll_component_id === data.payroll_component_id,
      );

      if (existing) {
        // UPDATE case
        await repo.update(existing.id, {
          ...data,
          warning_master_data_id: warningId, // Biar gak null
          status: ActiveStatus.Active,
          updatedBy: userId,
        });
        return repo.findOne({ where: { id: existing.id } });
      } else {
        // CREATE case
        const newDetail = repo.create({
          ...data,
          warning_master_data_id: warningId,
          createdBy: userId,
          updatedBy: userId,
        });
        return repo.save(newDetail);
      }
    }),
  );

  return processedDetails.filter((d) => d !== null);
}
}
