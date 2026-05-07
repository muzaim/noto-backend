import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HolidaysEntity } from './entities/holidays.entity';
import { HolidayService } from './holiday.service';
import { HolidayController } from './holiday.controller';
import { HolidayPeriodsModule } from '../holiday-periods/holiday-periods.module';

@Module({
  imports: [TypeOrmModule.forFeature([HolidaysEntity]), HolidayPeriodsModule],
  providers: [HolidayService],
  controllers: [HolidayController],
  exports: [HolidayService],
})
export class HolidayModule {}
