import { Injectable, ConflictException } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { LeaveTypeEntity } from './entities/leave-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { Repository } from 'typeorm';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@Injectable()
export class LeaveTypesService extends BaseService<LeaveTypeEntity> {
  constructor(
    @InjectRepository(LeaveTypeEntity)
    private readonly leaveTypeRepo: Repository<LeaveTypeEntity>,
    protected readonly logger: AppLogger,
  ) {
    super(leaveTypeRepo, logger);
    this.logger.setContext(LeaveTypesService.name);
  }

  async create(payload: CreateLeaveTypeDto, userId: any): Promise<any> {
    const exist = await this.leaveTypeRepo.findOne({
      where: {
        master_leave_id: payload.master_leave_id,
        leave_category_id: payload.leave_category_id,
      },
    });

    if (exist) {
      throw new ConflictException(
        'This leave category is already registered for the selected period.',
      );
    }

    return super.create(payload, userId);
  }
}
