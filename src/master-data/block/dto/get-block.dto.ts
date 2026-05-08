// get-block.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { GetTableDto } from 'src/helper/dto/general.dto';

export class GetBlockDto extends GetTableDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Filter by note ID',
  })
  @IsOptional()
  @IsNumberString()
  note_id?: string;
}
