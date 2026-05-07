import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateDimensionLevelsDTO } from 'src/master-data-competency/dimension-levels/dto/create-dimension-levels.dto';
export class CreateCompetenceDimensionsDTO {
  @ApiProperty({
    description: 'Name of the competence dimension',
    example: 'Communication Skills',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID of the competence group',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  competence_group_id: number;

  @ApiProperty({
    description: 'List of competence levels',
    type: [CreateDimensionLevelsDTO],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDimensionLevelsDTO) // Wajib untuk validasi array objek
  levels: CreateDimensionLevelsDTO[];
}
