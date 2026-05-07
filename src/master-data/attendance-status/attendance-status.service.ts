import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/services/base.service";
import { AttendanceStatusEntity } from "./entities/attendance-status.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";
import { Repository } from "typeorm";

@Injectable()
export class AttendanceStatusService extends BaseService<AttendanceStatusEntity> {
  constructor(
    @InjectRepository(AttendanceStatusEntity)
    private readonly attendanceStatusRepository: Repository<AttendanceStatusEntity>,
    protected readonly logger: AppLogger
  ) {
    super(attendanceStatusRepository, logger);
    this.logger.setContext(AttendanceStatusService.name);
  }
}