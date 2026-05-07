import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWarningTypeDto {
  @ApiProperty({ 
    example: 'SP 1', 
    description: 'The name of the warning type' })
    
  @IsString()
  @IsNotEmpty()
  warning_type: string;
}