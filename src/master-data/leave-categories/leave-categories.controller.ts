import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LeaveCategoriesService } from './leave-categories.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateLeaveCategoryDto } from './dto/create-leave-category.dto';
import { UpdateLeaveCategoryDto } from './dto/update-leave-category.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Leave Categories')
@Controller('/master-data/leave-categories')
export class LeaveCategoriesController {
  constructor(private readonly leaveCategoriesService: LeaveCategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new leave category' })
  @ApiResponse({
    status: 201,
    description: 'Leave category created successfully',
  })
  @Audit({
    tableName: 'mst_leave_categories',
    action: AuditAction.CREATE,
    description: 'Create a new leave category',
  })
  async create(@Body() payload: CreateLeaveCategoryDto) {
    const result = await this.leaveCategoriesService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Leave category created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all leave categories' })
  @ApiResponse({
    status: 200,
    description: 'Leave categories retrieved successfully',
  })
  @Audit({
    tableName: 'mst_leave_categories',
    action: AuditAction.VIEW,
    description: 'Retrieve all leave categories',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.leaveCategoriesService.findAll(query, [], null, [
      'leave_type',
    ]);
    return {
      status_code: 200,
      message: 'Leave categories retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active leave category options' })
  @ApiResponse({
    status: 200,
    description: 'Active leave category options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_leave_categories',
    action: AuditAction.VIEW,
    description: 'Retrieve active leave category options',
  })
  async findActiveList() {
    const result = await this.leaveCategoriesService.findOption();
    return {
      status_code: 200,
      message: 'Active leave category options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get leave category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Leave category retrieved successfully',
  })
  @Audit({
    tableName: 'mst_leave_categories',
    action: AuditAction.VIEW,
    description: 'Retrieve a leave category by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.leaveCategoriesService.findOne(id);
    return {
      status_code: 200,
      message: 'Leave category retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update leave category' })
  @ApiResponse({
    status: 200,
    description: 'Leave category updated successfully',
  })
  @Audit({
    tableName: 'mst_leave_categories',
    action: AuditAction.UPDATE,
    description: 'Update a leave category',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateLeaveCategoryDto,
  ) {
    const result = await this.leaveCategoriesService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Leave category updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete leave category' })
  @ApiResponse({
    status: 200,
    description: 'Leave category deleted successfully',
  })
  @Audit({
    tableName: 'mst_leave_categories',
    action: AuditAction.DELETE,
    description: 'Delete a leave category',
  })
  async remove(@Param('id') id: number) {
    const result = await this.leaveCategoriesService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Leave category deleted successfully',
      result: result,
    };
  }
}