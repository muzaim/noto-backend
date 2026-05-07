import { Module } from "@nestjs/common";
import { MaritalStatusService } from "./marital-statuses.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MaritalStatusesEntity } from "./entities/marital-statuses.entity";
import { MaritalStatusController } from "./marital-status.controller";

@Module({
  imports:[TypeOrmModule.forFeature([MaritalStatusesEntity])],
  providers:[MaritalStatusService],
  controllers:[MaritalStatusController],
  exports:[MaritalStatusService],
})

export class MaritalStatusModule {}