import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WarningMasterDataService } from './warning-master-data.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateWarningMasterDataDto } from './dto/create-warning-master-data.dto';
import { UpdateWarningMasterDataDto } from './dto/update-warning-master-data.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Warning Master Data')
@Controller('/master-data/warning-master-data')
export class WarningMasterDataController {
  constructor(private readonly service: WarningMasterDataService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warning master data' })
  @ApiResponse({
    status: 201,
    description: 'Warning master data created successfully',
  })
  @Audit({
    tableName: 'mst_warning_master_data',
    action: AuditAction.CREATE,
    description: 'Create warning master data',
  })
  async create(@Body() payload: CreateWarningMasterDataDto) {
    const result = await this.service.createMasterWarning(payload, 1);
    return {
      status_code: 201,
      message: 'Warning master data created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all warning master data' })
  @ApiResponse({
    status: 200,
    description: 'Warning master data retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_master_data',
    action: AuditAction.VIEW,
    description: 'Retrieve all warning master data',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.service.findAll(query, ['warning_type']);
    return {
      status_code: 200,
      message: 'Warning master data retrieved successfully',
      result: result, 
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active warning master data options' })
  @ApiResponse({
    status: 200,
    description: 'Active warning master data options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_master_data',
    action: AuditAction.VIEW,
    description: 'Retrieve active warning master data options',
  })
  async findActiveList() {
    const result = await this.service.findActiveList();
    return {
      status_code: 200,
      message: 'Active warning master data options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get warning master data by ID' })
  @ApiResponse({
    status: 200,
    description: 'Warning master data retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_master_data',
    action: AuditAction.VIEW,
    description: 'Retrieve warning master data by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.service.findOneActive(id);
    return {
      status_code: 200,
      message: 'Warning master data retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update warning master data' })
  @ApiResponse({
    status: 200,
    description: 'Warning master data updated successfully',
  })
  @Audit({
    tableName: 'mst_warning_master_data',
    action: AuditAction.UPDATE,
    description: 'Update warning master data',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateWarningMasterDataDto,
  ) {
    const result = await this.service.updateMasterWarning(id, payload, '1');
    return {
      status_code: 200,
      message: 'Warning master data updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete warning master data' })
  @ApiResponse({
    status: 200,
    description: 'Warning master data deleted successfully',
  })
  @Audit({
    tableName: 'mst_warning_master_data',
    action: AuditAction.DELETE,
    description: 'Delete warning master data',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.service.remove(id, 1);
    return {
      status_code: 200,
      message: 'Warning master data deleted successfully',
      result: result,
    };
  }
}