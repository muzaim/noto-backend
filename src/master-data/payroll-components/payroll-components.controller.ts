import { Body, Controller, Delete, Get, Param, Post, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PayrollComponentsService } from './payroll-components.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreatePayrollComponentDto } from './dto/create-payroll-component.dto';
import { UpdatePayrollComponentDto } from './dto/update-payroll-component.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Payroll Components')
@Controller('/master-data/payroll-components')
export class PayrollComponentsController {
  constructor(private readonly payrollComponentsService: PayrollComponentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payroll component' })
  @ApiResponse({
    status: 201,
    description: 'Payroll component created successfully',
  })
  @Audit({
    tableName: 'mst_payroll_components',
    action: AuditAction.CREATE,
    description: 'Create a new payroll component',
  })
  async create(@Body() payload: CreatePayrollComponentDto) {
    const result = await this.payrollComponentsService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Payroll component created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all payroll components' })
  @ApiResponse({
    status: 200,
    description: 'Payroll components retrieved successfully',
  })
  @Audit({
    tableName: 'mst_payroll_components',
    action: AuditAction.VIEW,
    description: 'Retrieve all payroll components',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.payrollComponentsService.findAll(query);
    return {
      status_code: 200,
      message: 'Payroll components retrieved successfully',
      result: result, 
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active payroll component options' })
  @ApiResponse({
    status: 200,
    description: 'Active payroll component options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_payroll_components',
    action: AuditAction.VIEW,
    description: 'Retrieve active payroll component options',
  })
  async findActiveList() {
    const result = await this.payrollComponentsService.findActiveList();
    return {
      status_code: 200,
      message: 'Active payroll component options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payroll component by ID' })
  @ApiResponse({
    status: 200,
    description: 'Payroll component retrieved successfully',
  })
  @Audit({
    tableName: 'mst_payroll_components',
    action: AuditAction.VIEW,
    description: 'Retrieve a payroll component by ID',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.payrollComponentsService.findOne(id);
    return {
      status_code: 200,
      message: 'Payroll component retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update payroll component' })
  @ApiResponse({
    status: 200,
    description: 'Payroll component updated successfully',
  })
  @Audit({
    tableName: 'mst_payroll_components',
    action: AuditAction.UPDATE,
    description: 'Update payroll component',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePayrollComponentDto,
  ) {
    const result = await this.payrollComponentsService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Payroll component updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete payroll component' })
  @ApiResponse({
    status: 200,
    description: 'Payroll component deleted successfully',
  })
  @Audit({
    tableName: 'mst_payroll_components',
    action: AuditAction.DELETE,
    description: 'Delete payroll component',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.payrollComponentsService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Payroll component deleted successfully',
      result: result,
    };
  }
}