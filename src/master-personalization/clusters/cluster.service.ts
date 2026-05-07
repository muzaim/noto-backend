import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { ClustersEntity } from './entities/cluster.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';

@Injectable()
export class ClustersService extends BaseService<ClustersEntity> {
  constructor(
    @InjectRepository(ClustersEntity)
    private readonly clusterRepository: Repository<ClustersEntity>,
    protected readonly logger: AppLogger
  ){
    super(clusterRepository, logger)
    this.logger.setContext(ClustersService.name)
  }
}
