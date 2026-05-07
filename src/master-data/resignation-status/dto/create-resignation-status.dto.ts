import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateResignationStatusDTO {
  @ApiProperty({
    example: 'Mengundurkan Diri',
    description: 'Nama untuk status resign'
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 'Mengundurkan diri karena sesuatu',
    description: 'Deskripsi status pengunduran diri'
  })
  @IsString()
  @IsOptional()
  description: string
}