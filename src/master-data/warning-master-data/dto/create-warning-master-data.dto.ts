import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateWarningDetailDto } from 'src/master-data/warning-details/dto/create-warning-detail.dto';

export class CreateWarningMasterDataDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  warning_type_id: number;

  @ApiProperty({ example: 6 })
  @IsNumber()
  @IsOptional()
  validity_period: number;

  @ApiProperty({ example: '2026-01-01' })
  @IsDateString()
  @IsNotEmpty()
  effective_date: string;

  @ApiProperty({ isArray: true })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateWarningDetailDto)
  details: CreateWarningDetailDto[];
}