import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { ClassificationsEntity } from './entities/classifications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';

@Injectable()
export class ClassificationsService extends BaseService<ClassificationsEntity> {
  constructor(
    @InjectRepository(ClassificationsEntity)
    private readonly classificationRepository: Repository<ClassificationsEntity>,
    protected readonly logger: AppLogger
  ){
    super(classificationRepository, logger)
    this.logger.setContext(ClassificationsService.name)
  }
}
