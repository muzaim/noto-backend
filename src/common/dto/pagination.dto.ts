import { IsOptional, IsString, IsIn, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsString()
  search?: string;
  
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  jenis_kompetensi_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  kelompok_kompetensi_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  per_page?: number = 10;

  @IsOptional()
  @IsString()
  sort_by?: string;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  order_by?: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';
}