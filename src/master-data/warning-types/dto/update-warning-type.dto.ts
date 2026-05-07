import { PartialType } from '@nestjs/mapped-types';
import { CreateWarningTypeDto } from './create-warning-type.dto';

export class UpdateWarningTypeDto extends PartialType(CreateWarningTypeDto) {}
