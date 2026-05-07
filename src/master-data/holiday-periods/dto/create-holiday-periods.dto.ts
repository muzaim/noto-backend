import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateHolidayPeriodsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '2024',
    description: 'Year of the holiday period',
  })
  year: string;
}