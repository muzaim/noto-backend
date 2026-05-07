import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDTO {
  @ApiProperty({
    example: 'Belajar NestJS',
    description: 'Name of the note',
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
