import { Injectable } from "@nestjs/common";
import { AppLogger } from "src/common/logger/app-logger.service";
import { BaseService } from "src/common/services/base.service";
import { MaritalStatusesEntity } from "./entities/marital-statuses.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MaritalStatusService extends BaseService<MaritalStatusesEntity> {
  constructor(
    @InjectRepository(MaritalStatusesEntity)
    private readonly maritalStatusRepository: Repository<MaritalStatusesEntity>,
    protected readonly logger: AppLogger,
  ) {
    super(maritalStatusRepository, logger);
    this.logger.setContext(MaritalStatusService.name);
  }
}