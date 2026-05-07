import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EducationalLevelsService } from './educational-levels.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateEducationalLevelDTO } from './dto/create-educational-level.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { UpdateEducationalLevelDTO } from './dto/update-educational-level.dto';

@ApiTags('Master Data - Educational Levels')
@Controller('/master-data/educational-levels')
export class EducationalLevelsController {
  constructor(
    private readonly educationalLevelsService: EducationalLevelsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new educational level record' })
  @ApiResponse({
    status: 201,
    description: 'Master data educational level record created successfully',
  })
  @Audit({
    tableName: 'mst_educational_levels',
    action: AuditAction.CREATE,
    description: 'Create a new educational level record',
  })
  async create(@Body() payload: CreateEducationalLevelDTO) {
    const result = await this.educationalLevelsService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Master data educational level record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all educational level records' })
  @ApiResponse({
    status: 200,
    description: 'Master data educational level records retrieved successfully',
  })
  @Audit({
    tableName: 'mst_educational_levels',
    action: AuditAction.VIEW,
    description: 'Retrieve all educational level records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.educationalLevelsService.findAll(
      query,
      [],
      null,
      ['name', 'description'],
    );
    return {
      status_code: 200,
      message: 'Master data educational level records retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active educational level options' })
  @ApiResponse({
    status: 200,
    description: 'Active educational level options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_educational_levels',
    action: AuditAction.VIEW,
    description: 'Retrieve active educational level options',
  })
  async findActiveList() {
    const result = await this.educationalLevelsService.findActiveList();
    return {
      status_code: 200,
      message: 'Active educational level options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific educational level record' })
  @ApiResponse({
    status: 200,
    description: 'Master data educational level record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_educational_levels',
    action: AuditAction.VIEW,
    description: 'Retrieve a specific educational level record',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.educationalLevelsService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data educational level record retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific educational level record' })
  @ApiResponse({
    status: 200,
    description: 'Master data educational level record updated successfully',
  })
  @Audit({
    tableName: 'mst_educational_levels',
    action: AuditAction.UPDATE,
    description: 'Update a specific educational level record',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateEducationalLevelDTO,
  ) {
    const result = await this.educationalLevelsService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master data educational level record updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific educational level record' })
  @ApiResponse({
    status: 200,
    description: 'Master data educational level record deleted successfully',
  })
  @Audit({
    tableName: 'mst_educational_levels',
    action: AuditAction.DELETE,
    description: 'Delete a specific educational level record',
  })
  async remove(@Param('id') id: number) {
    const result = await this.educationalLevelsService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Master data educational level record deleted successfully',
    };
  }
}
