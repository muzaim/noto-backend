import { Injectable } from "@nestjs/common";
import { ActiveStatus } from "src/database/enumlist";
import { BaseService } from "src/common/services/base.service";
import { WarningTypeEntity } from "./entities/warning-type.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";
import { Repository } from "typeorm";

@Injectable()
export class WarningTypesService extends BaseService<WarningTypeEntity> {
  constructor(
    @InjectRepository(WarningTypeEntity)
    private readonly warningTypeRepo: Repository<WarningTypeEntity>,
    protected readonly logger: AppLogger
  ) {
    super(warningTypeRepo, logger);
    this.logger.setContext(WarningTypesService.name);
  }

  async findOption() {
    this.logger.log('Fetching active warning type options');

    const options = await this.warningTypeRepo.find({
      where: { status: ActiveStatus.Active },
      select: ['id', 'warning_type'],
    });

    if (!options.length) {
      this.logger.warn('No active warning type options found');
      return [];
    }

    this.logger.log(`Found ${options.length} active warning type options`);
    return options;
  }

}