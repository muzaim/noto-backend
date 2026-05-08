// reorder-block.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ReorderBlockItemDto {
  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 0,
  })
  @IsNumber()
  orderIndex: number;
}

export class ReorderBlockDto {
  @ApiProperty({
    type: [ReorderBlockItemDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ReorderBlockItemDto)
  items: ReorderBlockItemDto[];
}
