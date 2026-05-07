import { Injectable, ConflictException } from "@nestjs/common";
import { BaseService } from "src/common/services/base.service";
import { MasterLeaveEntity } from "./entities/master-leave.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";
import { Repository } from "typeorm";
import { CreateMasterLeaveDto } from "./dto/create-master-leave.dto";
import { UpdateMasterLeaveDto } from "./dto/update-master-leavedto";
import { GetTableDto } from "src/helper/dto/general.dto";

@Injectable()
export class MasterLeavesService extends BaseService<MasterLeaveEntity> {
  constructor(
    @InjectRepository(MasterLeaveEntity)
    private readonly masterLeaveRepo: Repository<MasterLeaveEntity>,
    protected readonly logger: AppLogger
  ) {
    super(masterLeaveRepo, logger);
    this.logger.setContext(MasterLeavesService.name);
  }

  async findAll(query: GetTableDto): Promise<any> {
    const { page, limit, sort_by, order_by, term } = query;
    const limitValue = limit || 10;
    const offset = ((page || 1) - 1) * limitValue;

    const queryBuilder = this.masterLeaveRepo
      .createQueryBuilder('master')
      .loadRelationCountAndMap('master.leave_types_count', 'master.leave_types');

    if (term) {
      queryBuilder.where('CAST(master.year AS TEXT) ILIKE :term', {
        term: `%${term}%`,
      });
    }

    const [data, total] = await queryBuilder
      .orderBy(`master.${sort_by || 'id'}`, (order_by || 'DESC').toUpperCase() as any)
      .take(limitValue)
      .skip(offset)
      .getManyAndCount();

    return {
      data,
      meta: {
        total_items: total, 
        current_page: Number(page) || 1,
        per_page: Number(limitValue),
        total_pages: total > 0 ? Math.ceil(total / limitValue) : 0,
      },
    };
  }

  async create(payload: CreateMasterLeaveDto, userId: any): Promise<any> {
    const exist = await this.masterLeaveRepo.findOne({
      where: { year: payload.year },
    });

    if (exist) {
      throw new ConflictException(`Leave period for year ${payload.year} already registered.`);
    }

    return super.create(payload, userId);
  }

 async update(id: number, payload: UpdateMasterLeaveDto, userId: any): Promise<any> {
  const targetId = Number(id); 
    if (payload.year) {
      const exist = await this.masterLeaveRepo.findOne({
        where: { year: payload.year },
      });

      if (exist && exist.id !== targetId) {
        throw new ConflictException(`Year ${payload.year} is already in use.`);
      }
    }
    return super.update(targetId, payload, userId);
  }
}