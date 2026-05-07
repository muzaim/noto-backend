import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMaritalStatusDto {
  @ApiProperty({
    description: 'Name of the marital status',
    example: 'Single',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the marital status',
    example: 'Menunjukkan seseorang belum menikah',
  })
  @IsString()
  @IsOptional()
  description: string;
}