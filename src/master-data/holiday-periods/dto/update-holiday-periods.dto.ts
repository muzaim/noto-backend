import { PartialType } from '@nestjs/swagger';
import { CreateHolidayPeriodsDto } from './create-holiday-periods.dto';

export class UpdateHolidayPeriodsDto extends PartialType(CreateHolidayPeriodsDto) {}