import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateJobDto {
  @ApiProperty({ 
    description: 'Name of the job', 
    example: 'Software Engineer' })
    
  @IsNotEmpty()
  @IsString()
  name: string;

}