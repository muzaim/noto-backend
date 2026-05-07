import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { WarningMasterDataEntity } from './entities/warning-master-data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { Repository } from 'typeorm';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { CreateWarningMasterDataDto } from './dto/create-warning-master-data.dto';
import { UpdateWarningMasterDataDto } from './dto/update-warning-master-data.dto';
import { WarningDetailsService } from '../warning-details/warning-details.service';
import { ActiveStatus } from 'src/database/enumlist';

@Injectable()
export class WarningMasterDataService extends BaseService<WarningMasterDataEntity> {
  constructor(
    @InjectRepository(WarningMasterDataEntity)
    private readonly repo: Repository<WarningMasterDataEntity>,
    private readonly warningDetailService: WarningDetailsService,
    protected readonly logger: AppLogger,
  ) {
    super(repo, logger);
    this.logger.setContext(WarningMasterDataService.name);
  }

  async createMasterWarning(
    payload: CreateWarningMasterDataDto,
    userId: any,
  ): Promise<WarningMasterDataEntity> {
    this.logger.log(
      `[create] Creating warning master data with payload: ${JSON.stringify(payload)}`,
    );

    return this.repo.manager.transaction(async (manager) => {
      const warningMasterData = manager.create(WarningMasterDataEntity, {
        ...payload,
        createdBy: userId,
        updatedBy: userId,
        details: payload.details?.map((detail) => ({
          ...detail,
          createdBy: userId,
          updatedBy: userId,
        })),
      });

      const savedData = await manager.save(warningMasterData);
      this.logger.log(
        `[create] Warning master data created successfully with ID: ${savedData.id}`,
      );
      return savedData;
    });
  }

  async updateMasterWarning(
    id: number,
    payload: UpdateWarningMasterDataDto,
    userId: string,
  ): Promise<WarningMasterDataEntity> {
    this.logger.log(`[update] Updating master warning ID: ${id}`);

    const existing = await this.findOne(id, ['details']);
    if (!existing)
      throw new Error(`Warning master data with ID ${id} not found`);

    return this.repo.manager.transaction(async (manager) => {
      // 1. Update Parent (WarningMasterDataEntity)
      const { details, ...masterPayload } = payload;

      await manager.update(WarningMasterDataEntity, id, {
        ...masterPayload,
        updatedBy: userId,
      });

      // 2. Sync Children (WarningDetailEntity)
      if (details !== undefined) {
        await this.warningDetailService.updatebulkWarningDetails(
          id,
          details,
          userId,
          manager, // <--- PENTING: Oper manager biar satu transaksi
        );
      }

      this.logger.log(`[update] Successfully updated master warning ID: ${id}`);

      // 3. Return fresh data
      return this.findOne(id, ['warning_type', 'details']);
    });
  }

  // Di WarningMasterDataService.ts
  async findOneActive(id: number): Promise<WarningMasterDataEntity> {
    const qb = this.repo.createQueryBuilder('entity');

    // Custom join & filter di satu tempat
    qb.leftJoinAndSelect(
      'entity.details',
      'details',
      'details.status = :status',
      {
        status: ActiveStatus.Active,
      },
    )
      .leftJoinAndSelect('details.payroll_component', 'payroll_component')
      .leftJoinAndSelect('entity.warning_type', 'warning_type')
      .where('entity.id = :id', { id });

    const data = await qb.getOne();

    if (!data) throw new NotFoundException(`Warning Data ${id} not found`);

    return data;
  }

  // async findAll(query: GetTableDto): Promise<any> {
  //   this.logger.log('Fetching warning master data with relations');
  //   const { page, limit, sort_by, order_by, term } = query;
  //   const limitValue = Number(limit) || 10;
  //   const offset = ((Number(page) || 1) - 1) * limitValue;

  //   const queryBuilder = this.repo
  //     .createQueryBuilder('wmd')
  //     .leftJoinAndSelect('wmd.warning_type', 'wt')
  //     .leftJoinAndSelect('wmd.details', 'details')
  //     .leftJoinAndSelect('details.payroll_component', 'pc');

  //   if (term) {
  //     queryBuilder.where('wt.name ILIKE :term', { term: `%${term}%` });
  //   }

  //   const [data, total] = await queryBuilder
  //     .orderBy(
  //       `wmd.${sort_by || 'id'}`,
  //       (order_by || 'DESC').toUpperCase() as any,
  //     )
  //     .take(limitValue)
  //     .skip(offset)
  //     .getManyAndCount();

  //   return {
  //     data,
  //     meta: {
  //       total_items: total,
  //       current_page: Number(page) || 1,
  //       per_page: limitValue,
  //       total_pages: Math.ceil(total / limitValue),
  //     },
  //   };
  // }
}
