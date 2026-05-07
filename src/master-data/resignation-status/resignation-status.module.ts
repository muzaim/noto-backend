import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ResignationStatusEntity } from "./entities/resignation-status.entity";
import { ResignationStatusService } from "./resignation-status.service";
import { ResignationStatusController } from "./resignation-status.controller";

@Module({
  imports: [TypeOrmModule.forFeature([ResignationStatusEntity])],
  providers: [ResignationStatusService],
  controllers: [ResignationStatusController],
  exports: [ResignationStatusService],
})

export class ResignationStatusModule {}