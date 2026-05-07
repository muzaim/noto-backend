import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';

export class CreateWarningDetailDto {
  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  payroll_component_id: number;

  @ApiProperty({ example: 50, description: 'Percentage of salary reduction' })
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  reduction_percentage: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  warning_master_data_id: number;
}