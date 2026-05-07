import { Injectable } from "@nestjs/common";
import { AppLogger } from "src/common/logger/app-logger.service";
import { HolidayPeriodsEntity } from "./entities/holiday-periods.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "src/common/services/base.service";
import { ActiveStatus } from "src/database/enumlist";

@Injectable()
export class HolidayPeriodsService extends BaseService<HolidayPeriodsEntity> {
  constructor(
    @InjectRepository(HolidayPeriodsEntity)
    private readonly holidayPeriodsRepository: Repository<HolidayPeriodsEntity>,
    protected readonly logger: AppLogger, 
  ) {
    super(holidayPeriodsRepository, logger);
    this.logger.setContext(HolidayPeriodsService.name);
  }

  async findOptions() {
    this.logger.log('Fetching active holiday period options');
    const options = await this.holidayPeriodsRepository.find({
      where: { status: ActiveStatus.Active },
      select: ['id', 'year'],
    })

    if(!options.length) {
      this.logger.warn('No active holiday period options found');
      return [];
    }

    this.logger.log(`Found ${options.length} active holiday period options`);
    return options
  }
}