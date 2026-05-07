import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClusterDTO {
  @ApiProperty({
    example: 'Management',
    description: 'Name of the cluster',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Cluster untuk level manajemen',
    description: 'Description of the cluster',
  })
  @IsString()
  @IsOptional()
  description: string;
}
