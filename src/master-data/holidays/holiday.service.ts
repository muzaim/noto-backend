import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HolidaysEntity } from './entities/holidays.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { BaseService } from 'src/common/services/base.service';
import { HolidayPeriodsService } from '../holiday-periods/holiday-periods.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@Injectable()
export class HolidayService extends BaseService<HolidaysEntity> {
  constructor(
    @InjectRepository(HolidaysEntity)
    private readonly holidayRepository: Repository<HolidaysEntity>,
    private readonly holidayPeriodeService: HolidayPeriodsService,
    protected readonly logger: AppLogger,
  ) {
    super(holidayRepository, logger);
    this.logger.setContext(HolidayService.name);
  }

  async createHoliday(payload: CreateHolidayDto, userId: string) {
    this.logger.log(`Creating a new holiday with name: ${payload.name}`);
    const holidayPeriode = await this.holidayPeriodeService.findOne(
      payload.periode,
    );

    const holiday = this.holidayRepository.create({
      name: payload.name,
      date: payload.date,
      description: payload.description,
      periode: holidayPeriode,
      createdBy: userId,
      updatedBy: userId,
    });

    this.logger.log(`Saving the new holiday to the database`);
    return await this.holidayRepository.save(holiday);
  }

  async updateHoliday(id: number, payload: UpdateHolidayDto, userId: string) {
    this.logger.log(`Updating holiday with ID: ${id}`);

    const holiday = await this.findOne(id);

    const updateData = {
      ...payload,
      updatedBy: userId,
      periode: payload.periode
        ? await this.holidayPeriodeService.findOne(payload.periode)
        : undefined,
    };

    const result = await this.holidayRepository.save({
      id,
      ...updateData,
    });

    this.logger.log(`Holiday with ID: ${id} updated successfully`);
    return result;
  }
}
