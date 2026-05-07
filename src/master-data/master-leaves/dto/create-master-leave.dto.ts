import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateMasterLeaveDto {
  @ApiProperty({ 
    example: 2026,
    description: 'Fiscal year for leave period' })

  @IsInt()
  @IsNotEmpty({ message: 'Year cannot be empty' })
  year: number;

  @ApiProperty({ 
    example: 12, 
    description: 'Number of block leave days' })

  @IsInt()
  @IsNotEmpty({ message: 'Block leave is required' })
  @Min(0)
  block_leave: number;
}