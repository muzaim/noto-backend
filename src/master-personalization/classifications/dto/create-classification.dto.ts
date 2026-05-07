import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassificationDTO {
  @ApiProperty({
    example: 'Staff',
    description: 'Name of the classification',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Klasifikasi sebagai Staff',
    description: 'Description of the classification',
  })
  @IsString()
  @IsOptional()
  description: string;
}
