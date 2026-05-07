import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/services/base.service";
import { EducationalLevelsEntity } from "./entities/educational-levels.entity";
import { AppLogger } from "src/common/logger/app-logger.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class EducationalLevelsService extends BaseService<EducationalLevelsEntity> {
  constructor(
    @InjectRepository(EducationalLevelsEntity)
    private readonly educationalLevelsRepository: Repository<EducationalLevelsEntity>,
    protected readonly logger: AppLogger,
  ) {
    super(educationalLevelsRepository, logger);
    this.logger.setContext(EducationalLevelsService.name);
  }
}