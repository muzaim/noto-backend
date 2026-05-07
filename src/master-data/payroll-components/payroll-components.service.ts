import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/services/base.service";
import { PayrollComponentEntity } from "./entities/payroll-component.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";
import { Repository } from "typeorm";

@Injectable()
export class PayrollComponentsService extends BaseService<PayrollComponentEntity> {
  constructor(
    @InjectRepository(PayrollComponentEntity)
    private readonly payrollComponentRepository: Repository<PayrollComponentEntity>,
    protected readonly logger: AppLogger
  ) {
    super(payrollComponentRepository, logger);
    this.logger.setContext(PayrollComponentsService.name);
  }
}