import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Jobs')
@Controller('/master-data/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job record' })
  @ApiResponse({
    status: 201,
    description: 'Job record created successfully',
  })
  @Audit({
    tableName: 'mst_jobs',
    action: AuditAction.CREATE,
    description: 'Create a new job record',
  })
  async create(@Body() payload: CreateJobDto) {
    const result = await this.jobsService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Job record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all job records' })
  @ApiResponse({
    status: 200,
    description: 'Job records retrieved successfully',
  })
  @Audit({
    tableName: 'mst_jobs',
    action: AuditAction.VIEW,
    description: 'Retrieve all job records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.jobsService.findAll(query, [], null, ['name']);
    return {
      status_code: 200,
      message: 'Job records retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active job options' })
  @ApiResponse({
    status: 200,
    description: 'Active job options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_jobs',
    action: AuditAction.VIEW,
    description: 'Retrieve active job options',
  })
  async findActiveList() {
    const result = await this.jobsService.findActiveList();
    return {
      status_code: 200,
      message: 'Active job options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Job record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_jobs',
    action: AuditAction.VIEW,
    description: 'Retrieve a job record by ID',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.jobsService.findOne(id);
    return {
      status_code: 200,
      message: 'Job record retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a job record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Job record updated successfully',
  })
  @Audit({
    tableName: 'mst_jobs',
    action: AuditAction.UPDATE,
    description: 'Update a job record by ID',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateJobDto,
  ) {
    const result = await this.jobsService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Job record updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Job record deleted successfully',
  })
  @Audit({
    tableName: 'mst_jobs',
    action: AuditAction.DELETE,
    description: 'Delete a job record by ID',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.jobsService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Job record deleted successfully',
      result: result,
    };
  }
}