import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MasterLeavesService } from './master-leaves.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateMasterLeaveDto } from './dto/create-master-leave.dto';
import { UpdateMasterLeaveDto } from './dto/update-master-leavedto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Master Leaves')
@Controller('/master-data/master-leaves')
export class MasterLeavesController {
  constructor(private readonly masterLeavesService: MasterLeavesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new master leave period' })
  @ApiResponse({
    status: 201,
    description: 'Master leave created successfully',
  })
  @Audit({
    tableName: 'mst_master_leaves',
    action: AuditAction.CREATE,
    description: 'Create a new master leave period',
  })
  async create(@Body() payload: CreateMasterLeaveDto) {
    const result = await this.masterLeavesService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Master leave created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all master leave periods' })
  @ApiResponse({
    status: 200,
    description: 'Master leaves retrieved successfully',
  })
  @Audit({
    tableName: 'mst_master_leaves',
    action: AuditAction.VIEW,
    description: 'Retrieve all master leave periods',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.masterLeavesService.findAll(query);
    return {
      status_code: 200,
      message: 'Master leaves retrieved successfully',
      result: result, 
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active master leave options' })
  @ApiResponse({
    status: 200,
    description: 'Active master leave options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_master_leaves',
    action: AuditAction.VIEW,
    description: 'Retrieve active master leave options',
  })
  async findActiveList() {
    const result = await this.masterLeavesService.findActiveList();
    return {
      status_code: 200,
      message: 'Active master leave options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get master leave by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master leave retrieved successfully',
  })
  @Audit({
    tableName: 'mst_master_leaves',
    action: AuditAction.VIEW,
    description: 'Retrieve master leave by ID',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.masterLeavesService.findOne(id, ['leave_types']);
    return {
      status_code: 200,
      message: 'Master leave retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update master leave period' })
  @ApiResponse({
    status: 200,
    description: 'Master leave updated successfully',
  })
  @Audit({
    tableName: 'mst_master_leaves',
    action: AuditAction.UPDATE,
    description: 'Update a master leave period',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateMasterLeaveDto,
  ) {
    const result = await this.masterLeavesService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master leave updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete master leave period' })
  @ApiResponse({
    status: 200,
    description: 'Master leave deleted successfully',
  })
  @Audit({
    tableName: 'mst_master_leaves',
    action: AuditAction.DELETE,
    description: 'Delete a master leave period',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.masterLeavesService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Master leave deleted successfully',
      result: result,
    };
  }
}