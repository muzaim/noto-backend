import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentTypesDTO {
  @ApiProperty({ description: 'Name of the document type', example: 'KTP' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the document type', example: 'Kartu Tanda Penduduk' })
  @IsString()
  description: string;
  
}