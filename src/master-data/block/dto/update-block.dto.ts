// update-note-block.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateBlockDto } from './create-block.dto';

export class UpdateNoteBlockDTO extends PartialType(CreateBlockDto) {}
