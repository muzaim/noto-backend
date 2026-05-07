import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ReligionEntity } from "./entities/religion.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";
import { BaseService } from "src/common/services/base.service";

@Injectable()
export class ReligionService extends BaseService<ReligionEntity> {
  constructor(
    @InjectRepository(ReligionEntity)
    private readonly religionRepository: Repository<ReligionEntity>,
    protected readonly logger: AppLogger, 
  ) {
    super(religionRepository, logger);
    this.logger.setContext(ReligionService.name);
  }
}
