import { PartialType } from '@nestjs/swagger';
import { CreateCompetenceDimensionsDTO } from './create-competence-dimensions.dto';

export class UpdateCompetenceDimensionsDTO extends PartialType(CreateCompetenceDimensionsDTO) {}
