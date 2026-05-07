import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/services/base.service";
import { JobEntity } from "./entities/job.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";
import { Repository } from "typeorm";

@Injectable()
export class JobsService extends BaseService<JobEntity> {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
    protected readonly logger: AppLogger
  ) {
    super(jobRepository, logger);
    this.logger.setContext(JobsService.name);
  }
}