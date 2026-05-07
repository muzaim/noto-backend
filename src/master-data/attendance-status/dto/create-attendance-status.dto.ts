import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAttendanceStatusDto {
  @ApiProperty({ 
    description: 'Name of the attendance status', 
    example: 'Present' })
  @IsNotEmpty()
  @IsString()
  name: string;
}