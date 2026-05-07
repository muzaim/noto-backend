import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePayrollComponentDto {
  @ApiProperty({ example: 'Basic Salary' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Monthly fixed salary component' })
  @IsString()
  @IsOptional()
  description: string;
}