import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Query, 
  ParseIntPipe 
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WarningDetailsService } from './warning-details.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateWarningDetailDto } from './dto/create-warning-detail.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Warning Details')
@Controller('/master-data/warning-details')
export class WarningDetailsController {
  constructor(private readonly service: WarningDetailsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warning detail' })
  @ApiResponse({
    status: 201,
    description: 'Warning detail created successfully',
  })
  @Audit({
    tableName: 'mst_warning_details',
    action: AuditAction.CREATE,
    description: 'Create warning detail',
  })
  async create(@Body() payload: CreateWarningDetailDto) {
    const result = await this.service.create(payload, 1);
    return {
      status_code: 201,
      message: 'Warning detail created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all warning details' })
  @ApiResponse({
    status: 200,
    description: 'Warning details retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_details',
    action: AuditAction.VIEW,
    description: 'Retrieve all warning details',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.service.findAll(query);
    return {
      status_code: 200,
      message: 'Warning details retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active warning detail options' })
  @ApiResponse({
    status: 200,
    description: 'Active warning detail options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_details',
    action: AuditAction.VIEW,
    description: 'Retrieve active warning detail options',
  })
  async findActiveList() {
    const result = await this.service.findActiveList();
    return {
      status_code: 200,
      message: 'Active warning detail options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get warning detail by ID' })
  @ApiResponse({
    status: 200,
    description: 'Warning detail retrieved successfully',
  })
  @Audit({
    tableName: 'mst_warning_details',
    action: AuditAction.VIEW,
    description: 'Retrieve warning detail by ID',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.service.findOne(id, [
      'payroll_component',
      'warning_master_data',
      'warning_master_data.warning_type',
    ]);
    return {
      status_code: 200,
      message: 'Warning detail retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update warning detail' })
  @ApiResponse({
    status: 200,
    description: 'Warning detail updated successfully',
  })
  @Audit({
    tableName: 'mst_warning_details',
    action: AuditAction.UPDATE,
    description: 'Update warning detail',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: any, 
  ) {
    const result = await this.service.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Warning detail updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete warning detail' })
  @ApiResponse({
    status: 200,
    description: 'Warning detail deleted successfully',
  })
  @Audit({
    tableName: 'mst_warning_details',
    action: AuditAction.DELETE,
    description: 'Delete warning detail',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.service.remove(id, 1);
    return {
      status_code: 200,
      message: 'Warning detail deleted successfully',
      result: result,
    };
  }
}