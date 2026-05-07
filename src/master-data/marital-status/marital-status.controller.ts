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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MaritalStatusService } from './marital-statuses.service';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { Audit } from 'src/common/decorators/audit.decorator';
import { CreateMaritalStatusDto } from './dto/create-marital-status.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@Controller('/master-data/marital-status')
@ApiTags('Master Data - Marital Status')
export class MaritalStatusController {
  constructor(private readonly maritalStatusService: MaritalStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new marital status' })
  @ApiResponse({
    status: 201,
    description: 'Marital status created successfully',
  })
  @Audit({
    tableName: 'mst_marital_statuses',
    action: AuditAction.CREATE,
    description: 'Create a new marital status',
  })
  async create(@Body() payload: CreateMaritalStatusDto) {
    const result = await this.maritalStatusService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Marital status created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all marital statuses' })
  @ApiResponse({
    status: 200,
    description: 'Marital statuses retrieved successfully',
  })
  @Audit({
    tableName: 'mst_marital_statuses',
    action: AuditAction.VIEW,
    description: 'Retrieve all marital statuses',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.maritalStatusService.findAll(query, [], null, [
      'name',
      'description',
    ]);
    return {
      status_code: 200,
      message: 'Marital statuses retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active marital status options' })
  @ApiResponse({
    status: 200,
    description: 'Active marital status options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_marital_statuses',
    action: AuditAction.VIEW,
    description: 'Retrieve active marital status options',
  })
  async findActiveList() {
    const result = await this.maritalStatusService.findActiveList();
    return {
      status_code: 200,
      message: 'Active marital status options retrieved successfully',
      result: result,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get marital status by ID' })
  @ApiResponse({
    status: 200,
    description: 'Marital status retrieved successfully',
  })
  @Audit({
    tableName: 'mst_marital_statuses',
    action: AuditAction.VIEW,
    description: 'Retrieve marital status by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.maritalStatusService.findOne(id);
    return {
      status_code: 200,
      message: 'Marital status retrieved successfully',
      result: result,
    };
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update marital status by ID' })
  @ApiResponse({
    status: 200,
    description: 'Marital status updated successfully',
  })
  @Audit({
    tableName: 'mst_marital_statuses',
    action: AuditAction.UPDATE,
    description: 'Update marital status by ID',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: CreateMaritalStatusDto,
  ) {
    const result = await this.maritalStatusService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Marital status updated successfully',
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete marital status by ID' })
  @ApiResponse({
    status: 200,
    description: 'Marital status deleted successfully',
  })
  @Audit({
    tableName: 'mst_marital_statuses',
    action: AuditAction.DELETE,
    description: 'Delete marital status by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.maritalStatusService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Marital status deleted successfully',
    };
  }
}
