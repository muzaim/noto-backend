import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDimensionLevelsDTO {
  // @ApiPropertyOptional({
  //   description: 'ID of the level (diperlukan saat update/sync)',
  //   example: `{untuk Update}`,
  // })
  // @IsNumber()
  // @IsOptional()
  // id?: number;

  @ApiProperty({ description: 'Nama level', example: 'Level 1' })
  @IsString()
  @IsNotEmpty()
  level_name: string;

  @ApiProperty({
    description: 'Deskripsi level',
    example:
      'Menjalankan pekerjaannya dengan mengacu pada kebijakan, peraturan, etika bisnis, prinsip moral, dan nilai-nilai perusahaan.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  // @ApiProperty({ description: 'Dimension ID', example: 1 })
  // @IsNumber()
  // @IsNotEmpty()
  // dimension_id;
}
