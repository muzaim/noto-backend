// create-note-block.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BlockType } from '../entities/block.entity';
import { Column } from 'typeorm';

export class CreateBlockDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the block',
  })
  @IsNumber()
  @IsNotEmpty()
  noteId: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  // @ApiPropertyOptional({
  //   example: 1,
  //   description: 'Parent block ID',
  // })
  // @IsOptional()
  // @IsNumber()
  // parentId?: number;

  @ApiProperty({
    example: BlockType.TEXT,
    enum: BlockType,
    description: 'Type of the block',
  })
  @IsEnum(BlockType)
  @IsNotEmpty()
  type: BlockType;

  @ApiProperty({
    example: '{"text":"Hello world"}',
    description: 'Block content in JSON string format',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Block order index',
  })
  @IsOptional()
  @IsNumber()
  orderIndex?: number;

  @ApiPropertyOptional({
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  checked?: boolean;
}
