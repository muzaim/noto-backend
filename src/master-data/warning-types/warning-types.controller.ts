import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WarningTypesService } from './warning-types.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateWarningTypeDto } from './dto/create-warning-type.dto';
import { UpdateWarningTypeDto } from './dto/update-warning-type.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Warning Types')
@Controller('/master-data/warning-types')
export class WarningTypesController {
  constructor(private readonly warningTypesService: WarningTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warning type' })
  @ApiResponse({
    status: 201,
    description: 'Warning type created successfully',
  })
  @Audit({
    tableName: 'mst_warning_types',
    action: AuditAction.CREATE,
    description: 'Create a new warning type configuration',
  })
  async create(@Body() payload: CreateWarningTypeDto) {
    const result = await this.warningTypesService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Warning type created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all warning types' })
  @ApiResponse({
    status: 200,
    description: 'Warning types retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_types',
    action: AuditAction.VIEW,
    description: 'Retrieve all warning types',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.warningTypesService.findAll(query);
    return {
      status_code: 200,
      message: 'Warning types retrieved successfully',
      result: result, // Mengubah ...result menjadi result agar konsisten
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active warning type options' })
  @ApiResponse({
    status: 200,
    description: 'Active warning type options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_types',
    action: AuditAction.VIEW,
    description: 'Retrieve active warning type options',
  })
  async findActiveList() {
    const result = await this.warningTypesService.findOption();
    return {
      status_code: 200,
      message: 'Active warning type options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get warning type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Warning type retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_types',
    action: AuditAction.VIEW,
    description: 'Retrieve warning type by ID',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.warningTypesService.findOne(id);
    return {
      status_code: 200,
      message: 'Warning type retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update warning type' })
  @ApiResponse({
    status: 200,
    description: 'Warning type updated successfully',
  })
  @Audit({
    tableName: 'mst_warning_types',
    action: AuditAction.UPDATE,
    description: 'Update warning type configuration',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateWarningTypeDto,
  ) {
    const result = await this.warningTypesService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Warning type updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete warning type' })
  @ApiResponse({
    status: 200,
    description: 'Warning type deleted successfully',
  })
  @Audit({
    tableName: 'mst_warning_types',
    action: AuditAction.DELETE,
    description: 'Delete warning type configuration',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.warningTypesService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Warning type deleted successfully',
      result: result,
    };
  }
}