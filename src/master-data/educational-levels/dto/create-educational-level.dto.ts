import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEducationalLevelDTO {
  @ApiProperty({
    description: "Name of the educational level",
    example: "Sekolah Dasar (SD)",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Description of the educational level",
    example: "Tingkat pendidikan dasar yang mencakup kelas 1 hingga kelas 6",
  })
  @IsString()
  @IsOptional()
  description?: string;
}