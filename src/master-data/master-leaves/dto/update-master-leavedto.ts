import { PartialType } from '@nestjs/mapped-types';
import { CreateMasterLeaveDto } from './create-master-leave.dto';

export class UpdateMasterLeaveDto extends PartialType(CreateMasterLeaveDto) {}
