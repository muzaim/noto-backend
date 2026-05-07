import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { HolidayPeriodsService } from './holiday-periods.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateHolidayPeriodsDto } from './dto/create-holiday-periods.dto';
import { UpdateHolidayPeriodsDto } from './dto/update-holiday-periods.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';

@Controller('/master-data/holiday-periods')
@ApiTags('Master Data - Holiday Periods')
export class HolidayPeriodsController {
  constructor(private readonly holidayPeriodsService: HolidayPeriodsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new holiday period record' })
  @ApiResponse({
    status: 201,
    description: 'Master data holiday period record created successfully',
  })
  @Audit({
    tableName: 'mst_holiday_periods',
    action: AuditAction.CREATE,
    description: 'Create a new Holiday Periode record',
  })
  async create(@Body() payload: CreateHolidayPeriodsDto) {
    const result = await this.holidayPeriodsService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Master data holiday period record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all holiday period records' })
  @ApiResponse({
    status: 200,
    description: 'Master data holiday period records retrieved successfully',
  })
  @Audit({
    tableName: 'mst_holiday_periods',
    action: AuditAction.VIEW,
    description: 'View holiday period records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.holidayPeriodsService.findAll(query, [], null, [
      'year',
    ]);
    return {
      status_code: 200,
      message: 'Master data holiday period records retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active holiday period options' })
  @ApiResponse({
    status: 200,
    description: 'Active holiday period options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_holiday_periods',
    action: AuditAction.VIEW,
    description: 'View active holiday period options',
  })
  async findActiveList() {
    const result = await this.holidayPeriodsService.findOptions();
    return {
      status_code: 200,
      message: 'Active holiday period options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a holiday period record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data holiday period record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_holiday_periods',
    action: AuditAction.VIEW,
    description: 'View holiday period record',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.holidayPeriodsService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data holiday period record retrieved successfully',
      result: result,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a holiday period record (partial)' })
  @ApiResponse({
    status: 200,
    description: 'Master data holiday period record updated successfully',
  })
  @Audit({
    tableName: 'mst_holiday_periods',
    action: AuditAction.UPDATE,
    description: 'Update holiday period record',
  })
  async updatePatch(
    @Param('id') id: number,
    @Body() payload: UpdateHolidayPeriodsDto,
  ) {
    const result = await this.holidayPeriodsService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master data holiday period record updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a holiday period record' })
  @ApiResponse({
    status: 200,
    description: 'Master data holiday period record deleted successfully',
  })
  @Audit({
    tableName: 'mst_holiday_periods',
    action: AuditAction.DELETE,
    description: 'Delete a holiday period record',
  })
  async remove(@Param('id') id: number) {
    const result = await this.holidayPeriodsService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Master data holiday period record deleted successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a holiday period record (full)' })
  @ApiResponse({
    status: 200,
    description: 'Master data holiday period record updated successfully',
  })
  @Audit({
    tableName: 'mst_holiday_periods',
    action: AuditAction.UPDATE,
    description: 'Update a holiday period record',
  })
  async updatePut(
    @Param('id') id: number,
    @Body() updateHolidayPeriodsDto: UpdateHolidayPeriodsDto,
  ) {
    const result = await this.holidayPeriodsService.update(
      id,
      updateHolidayPeriodsDto,
      1,
    );
    return {
      status_code: 200,
      message: 'Master data holiday period record updated successfully',
    };
  }
}
