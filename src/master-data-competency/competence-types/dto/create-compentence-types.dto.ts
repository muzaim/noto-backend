import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompetenceTypesDTO {
  @ApiProperty({
    description: 'Name of the competence type',
    example: 'Technical Skills',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
