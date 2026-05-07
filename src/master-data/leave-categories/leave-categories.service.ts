import { Injectable, ConflictException } from "@nestjs/common";
import { ActiveStatus } from "src/database/enumlist";
import { BaseService } from "src/common/services/base.service";
import { LeaveCategoryEntity } from "./entities/leave-category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";
import { Repository } from "typeorm";
import { CreateLeaveCategoryDto } from "./dto/create-leave-category.dto";
import { UpdateLeaveCategoryDto } from "./dto/update-leave-category.dto";

@Injectable()
export class LeaveCategoriesService extends BaseService<LeaveCategoryEntity> {
  constructor(
    @InjectRepository(LeaveCategoryEntity)
    private readonly leaveCategoryRepo: Repository<LeaveCategoryEntity>,
    protected readonly logger: AppLogger
  ) {
    super(leaveCategoryRepo, logger);
    this.logger.setContext(LeaveCategoriesService.name);
  }

  async create(payload: CreateLeaveCategoryDto, userId: any): Promise<any> {
    this.logger.log(`Creating leave category with leave_type=${payload.leave_type}`);

    const exist = await this.leaveCategoryRepo.findOne({
      where: { leave_type: payload.leave_type },
    });

    if (exist) {
      this.logger.warn(`Leave category '${payload.leave_type}' already exists`);
      throw new ConflictException(`Leave category '${payload.leave_type}' already exists.`);
    }

    const result = await super.create(payload, userId);
    this.logger.log(`Leave category created successfully with id=${result.id}`);
    return result;
  }

  async update(id: number, payload: UpdateLeaveCategoryDto, userId: any): Promise<any> {
    this.logger.log(`Updating leave category id=${id}`);

    if (payload.leave_type) {
      const exist = await this.leaveCategoryRepo.findOne({
        where: { leave_type: payload.leave_type },
      });

      if (exist && exist.id !== id) {
        this.logger.warn(`Leave category name '${payload.leave_type}' is already in use.`);
        throw new ConflictException(`Leave category name '${payload.leave_type}' is already in use.`);
      }
    }

    const result = await super.update(id, payload, userId);
    this.logger.log(`Leave category updated successfully for id=${id}`);
    return result;
  }

  async findOption() {
    this.logger.log('Fetching active leave category options');

    const options = await this.leaveCategoryRepo.find({
      where: { status: ActiveStatus.Active },
      select: ['id', 'leave_type'],
    });

    if (!options.length) {
      this.logger.warn('No active leave category options found');
      return [];
    }

    this.logger.log(`Found ${options.length} active leave category options`);
    return options;
  }
}