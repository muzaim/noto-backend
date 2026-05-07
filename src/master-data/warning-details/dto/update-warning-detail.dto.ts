import { PartialType } from '@nestjs/mapped-types';
import { CreateWarningDetailDto } from './create-warning-detail.dto';

export class UpdateWarningDetailDto extends PartialType(CreateWarningDetailDto) {}
