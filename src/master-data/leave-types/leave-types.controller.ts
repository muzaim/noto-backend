import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LeaveTypesService } from './leave-types.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Leave Types')
@Controller('/master-data/leave-types')
export class LeaveTypesController {
  constructor(private readonly leaveTypesService: LeaveTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new leave type' })
  @ApiResponse({
    status: 201,
    description: 'Leave type created successfully',
  })
  @Audit({
    tableName: 'mst_leave_types',
    action: AuditAction.CREATE,
    description: 'Create a new leave type configuration',
  })
  async create(@Body() payload: CreateLeaveTypeDto) {
    const result = await this.leaveTypesService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Leave type created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all leave types' })
  @ApiResponse({
    status: 200,
    description: 'Leave types retrieved successfully',
  })
  @Audit({
    tableName: 'mst_leave_types',
    action: AuditAction.VIEW,
    description: 'Retrieve all leave types',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.leaveTypesService.findAll(
      query,
      ['leave_category', 'master_leave'],
      (qb) => {
        if (query.periode) {
          qb.leftJoin('entity.master_leave', 'ml') // ml = master_leave (alias baru)
            .andWhere('ml.year = :periode', { periode: query.periode });
        }
      },
    );
    return {
      status_code: 200,
      message: 'Leave types retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active leave type options' })
  @ApiResponse({
    status: 200,
    description: 'Active leave type options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_leave_types',
    action: AuditAction.VIEW,
    description: 'Retrieve active leave type options',
  })
  async findActiveList() {
    const result = await this.leaveTypesService.findActiveList();
    return {
      status_code: 200,
      message: 'Active leave type options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get leave type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Leave type retrieved successfully',
  })
  @Audit({
    tableName: 'mst_leave_types',
    action: AuditAction.VIEW,
    description: 'Retrieve leave type by ID',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.leaveTypesService.findOne(id, [
      'leave_category',
      'master_leave',
    ]);
    return {
      status_code: 200,
      message: 'Leave type retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update leave type' })
  @ApiResponse({
    status: 200,
    description: 'Leave type updated successfully',
  })
  @Audit({
    tableName: 'mst_leave_types',
    action: AuditAction.UPDATE,
    description: 'Update leave type configuration',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLeaveTypeDto,
  ) {
    const result = await this.leaveTypesService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Leave type updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete leave type' })
  @ApiResponse({
    status: 200,
    description: 'Leave type deleted successfully',
  })
  @Audit({
    tableName: 'mst_leave_types',
    action: AuditAction.DELETE,
    description: 'Delete leave type configuration',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.leaveTypesService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Leave type deleted successfully',
      result: result,
    };
  }
}
