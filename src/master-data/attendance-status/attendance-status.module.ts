import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendanceStatusEntity } from "./entities/attendance-status.entity";
import { AttendanceStatusService } from "./attendance-status.service";
import { AttendanceStatusController } from "./attendance-status.controller";

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceStatusEntity])],
  providers: [AttendanceStatusService],
  controllers: [AttendanceStatusController],
  exports: [AttendanceStatusService],
})
export class AttendanceStatusModule {}