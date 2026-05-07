import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { CompetenceTypesEntity } from './entities/competence-types.entity';
import { Repository } from 'typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompetenceTypesService extends BaseService<CompetenceTypesEntity> {
  constructor(
    @InjectRepository(CompetenceTypesEntity)
    private readonly competenceTypesRepository: Repository<CompetenceTypesEntity>,
    protected readonly logger: AppLogger,
  ) {
    super(competenceTypesRepository, logger);
    this.logger.setContext(CompetenceTypesService.name);
  }

  getRepository(): Repository<CompetenceTypesEntity> {
    return this.repository;
  }
}
