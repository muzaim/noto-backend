import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateCurrencyDTO {
  @ApiProperty({
    description: "Currency code (e.g., USD, EUR)",
    example: "USD",
  }) 
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: "Currency name (e.g., US Dollar)",
    example: "US Dollar",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Currency symbol (e.g., $)",
    example: "$",
  })
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @ApiProperty({
    description: "Indicates if this currency is the default rate",
    example: false,
  })
  @IsBoolean()
  default_rate: boolean;
}