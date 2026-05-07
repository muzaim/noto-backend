import { PartialType } from '@nestjs/swagger';
import { CreateReligionDTO } from './create-religion.dto';

export class UpdateReligionDTO extends PartialType(CreateReligionDTO) {}
