import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetTableDto {
  @IsOptional()
  sort_by?: string;

  @IsOptional()
  @IsEnum(SortType)
  order_by?: SortType;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  term?: string;

  @IsOptional()
  status?: string;
  
  @IsOptional()
  @IsNumber()
  periode?: number
}

export class MetaTable {
  page: number;
  per_page: number;
  total_items: number;
  total_pages: number;
}

export class ResultTable {
  message: string;
  data: Array<any>;
  meta: MetaTable;
}

export class GetOptionsDTO {
  @IsOptional()
  term?: string;
}
