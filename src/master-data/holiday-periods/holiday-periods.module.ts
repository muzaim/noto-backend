import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HolidayPeriodsEntity } from "./entities/holiday-periods.entity";
import { HolidayPeriodsService } from "./holiday-periods.service";
import { HolidayPeriodsController } from "./holiday-periods.controller";

@Module({
  imports: [TypeOrmModule.forFeature([HolidayPeriodsEntity])],
  providers: [HolidayPeriodsService],
  controllers: [HolidayPeriodsController],
  exports: [HolidayPeriodsService],
})

export class HolidayPeriodsModule {}