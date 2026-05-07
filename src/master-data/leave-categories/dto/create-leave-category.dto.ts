import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLeaveCategoryDto {
  @ApiProperty({ 
    example: 'Annual Leave', 
    description: 'The name or type of the leave category' 
  })
  
  @IsNotEmpty({ message: 'Leave type name cannot be empty' })
  @IsString()
  leave_type: string;
}