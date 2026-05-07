import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceStatusDto } from './create-attendance-status.dto';

export class UpdateAttendanceStatusDto extends PartialType(CreateAttendanceStatusDto) {}
