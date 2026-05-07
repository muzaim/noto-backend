import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCompetenceGroupDTO {
  @ApiProperty({
    description: 'Name of the competence group',
    example: 'Integrity',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Code of the competence group',
    example: 'INT',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Definition of the competence group',
    example:
      'Kemampuan menjalankan setiap aktivitas dengan berpegang pada kebijakan, peraturan, etika bisnis, prinsip moral, dan nilai-nilai perusahaan, berani mengakui kesalahan dan melaporkan jika terjadi pelanggaran, serta bertanggung jawab penuh atas segala yang diperbuat atau diputuskan dalam pekerjaan.',
  })
  @IsString()
  @IsNotEmpty()
  definition: string;

  @ApiProperty({
    description: 'ID of the competence type this group belongs to',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  competence_type_id: number;
}
