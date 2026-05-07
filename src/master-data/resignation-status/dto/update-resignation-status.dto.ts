import { PartialType } from '@nestjs/swagger';
import { CreateResignationStatusDTO } from './create-resignation-status.dto';

export class UpdateResignationStatusDTO extends PartialType(CreateResignationStatusDTO) {}
