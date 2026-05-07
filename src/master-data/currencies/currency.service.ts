import { Injectable } from "@nestjs/common";
import { CurrencyEntity } from "./entities/currency.entity";
import { BaseService } from "src/common/services/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";

@Injectable()
export class CurrencyService extends BaseService<CurrencyEntity> {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
    protected readonly logger: AppLogger,
  ) {
    super(currencyRepository, logger);
    this.logger.setContext(CurrencyService.name);
  }
}