import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  Delete,
} from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { CreateHolidayDto } from './dto/create-holiday.dto';

@ApiTags('Master Data - Holidays')
@Controller('/master-data/holidays')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new holiday' })
  @ApiResponse({
    status: 201,
    description: 'Holiday created successfully',
  })
  @Audit({
    tableName: 'mst_holidays',
    action: AuditAction.CREATE,
    description: 'Create a new holiday',
  })
  async create(@Body() payload: CreateHolidayDto) {
    const result = await this.holidayService.createHoliday(payload, '1');
    return {
      status_code: 201,
      message: 'Holiday created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all holidays' })
  @ApiResponse({
    status: 200,
    description: 'Holidays retrieved successfully',
  })
  @Audit({
    tableName: 'mst_holidays',
    action: AuditAction.VIEW,
    description: 'Retrieve all holidays',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.holidayService.findAll(
      query,
      ['periode'],
      (qb) => {
        if (query.periode) {
          qb.andWhere('entity.periodeId = :periodeId', {
            periodeId: query.periode,
          });
        }
        if (query.status) {
          qb.andWhere('entity.status = :status', { status: query.status });
        }
      },
      ['name', 'description'],
    );
    return {
      status_code: 200,
      message: 'Holidays retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active holiday options' })
  @ApiResponse({
    status: 200,
    description: 'Active holiday options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_holidays',
    action: AuditAction.VIEW,
    description: 'Retrieve active holiday options',
  })
  async findActiveList() {
    const result = await this.holidayService.findActiveList();
    return {
      status_code: 200,
      message: 'Active holiday options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a holiday by ID' })
  @ApiResponse({
    status: 200,
    description: 'Holiday retrieved successfully',
  })
  @Audit({
    tableName: 'mst_holidays',
    action: AuditAction.VIEW,
    description: 'Retrieve a holiday by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.holidayService.findOne(id);
    return {
      status_code: 200,
      message: 'Holiday retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing holiday' })
  @ApiResponse({
    status: 200,
    description: 'Holiday updated successfully',
  })
  @Audit({
    tableName: 'mst_holidays',
    action: AuditAction.UPDATE,
    description: 'Update an existing holiday',
  })
  async update(@Param('id') id: string, @Body() payload: UpdateHolidayDto) {
    const result = await this.holidayService.updateHoliday(+id, payload, '1');
    return {
      status_code: 200,
      message: 'Holiday updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a holiday by ID' })
  @ApiResponse({
    status: 200,
    description: 'Holiday deleted successfully',
  })
  @Audit({
    tableName: 'mst_holidays',
    action: AuditAction.DELETE,
    description: 'Delete a holiday by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.holidayService.remove(id);
    return {
      status_code: 200,
      message: 'Holiday deleted successfully',
    };
  }
}
