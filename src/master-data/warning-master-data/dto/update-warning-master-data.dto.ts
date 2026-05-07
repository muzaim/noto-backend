
import { PartialType } from '@nestjs/swagger';
import { CreateWarningMasterDataDto } from './create-warning-master-data.dto';

export class UpdateWarningMasterDataDto extends PartialType(CreateWarningMasterDataDto) {}
