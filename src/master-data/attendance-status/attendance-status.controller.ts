import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttendanceStatusService } from './attendance-status.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateAttendanceStatusDto } from './dto/create-attendance-status.dto';
import { UpdateAttendanceStatusDto } from './dto/update-attendance-status.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Attendance Status')
@Controller('/master-data/attendance-status')
export class AttendanceStatusController {
  constructor(private readonly attendanceStatusService: AttendanceStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attendance status record' })
  @ApiResponse({ status: 201, description: 'Attendance status record created successfully' })
  @Audit({
    tableName: 'mst_attendance_statuses',
    action: AuditAction.CREATE,
    description: 'Create a new attendance status record',
  })
  async create(@Body() payload: CreateAttendanceStatusDto) {
    const result = await this.attendanceStatusService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Attendance status record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all attendance status records' })
  @Audit({
    tableName: 'mst_attendance_statuses',
    action: AuditAction.VIEW,
    description: 'Retrieve all attendance status records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.attendanceStatusService.findAll(query, [], null, ['name']);
    return {
      status_code: 200,
      message: 'Attendance status records retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an attendance status record by ID' })
  @Audit({
    tableName: 'mst_attendance_statuses',
    action: AuditAction.VIEW,
    description: 'Retrieve an attendance status record by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.attendanceStatusService.findOne(id);
    return {
      status_code: 200,
      message: 'Attendance status record retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an attendance status record by ID' })
  @Audit({
    tableName: 'mst_attendance_statuses',
    action: AuditAction.UPDATE,
    description: 'Update an attendance status record by ID',
  })
  async update(@Param('id') id: number, @Body() payload: UpdateAttendanceStatusDto) {
    const result = await this.attendanceStatusService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Attendance status record updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an attendance status record by ID' })
  @Audit({
    tableName: 'mst_attendance_statuses',
    action: AuditAction.DELETE,
    description: 'Delete an attendance status record by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.attendanceStatusService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Attendance status record deleted successfully',
      result: result,
    };
  }
}