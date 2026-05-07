import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/services/base.service";
import { ResignationStatusEntity } from "./entities/resignation-status.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";

@Injectable()
export class ResignationStatusService extends BaseService<ResignationStatusEntity> {
  constructor(
    @InjectRepository(ResignationStatusEntity)
    private readonly resignationStatusRepo: Repository<ResignationStatusEntity>,
    protected readonly logger: AppLogger
  ){
    super(resignationStatusRepo, logger);
    this.logger.setContext(ResignationStatusService.name)
  }
}