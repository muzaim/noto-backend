import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, Min } from "class-validator";

export class CreateLeaveTypeDto {
  @ApiProperty({ 
    example: 1, 
    description: 'ID of the leave category' })

  @IsNotEmpty()
  @IsInt()
  leave_category_id: number;

  @ApiProperty({ 
    example: 12, 
    description: 'Number of leave days' })
    
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  leave_days: number;

  @ApiProperty({ 
    example: 1, 
    description: 'ID of the master leave (period)' })

  @IsNotEmpty()
  @IsInt()
  master_leave_id: number;
}