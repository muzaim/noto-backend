import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReligionDTO {
  @ApiProperty({
    example: 'Islam',
    description: 'Name of the religion',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Agama Islam',
    description: 'Description of the religion',
  })
  @IsString()
  @IsOptional()
  description: string;
}
