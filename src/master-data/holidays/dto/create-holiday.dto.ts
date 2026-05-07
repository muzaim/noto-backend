import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHolidayDto {
  @ApiProperty({
    description: 'Name of the holiday',
    example: "New Year's Day",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Date of the holiday',
    example: '2024-01-01',
  })
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Description of the holiday',
    example: 'First day of the year',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'ID of the holiday period (year)',
    example: 1,
  })
  @IsNotEmpty()
  periode: number;
}
