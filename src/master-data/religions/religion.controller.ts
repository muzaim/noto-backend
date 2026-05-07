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
import { ReligionService } from './religion.service';
import { CreateReligionDTO } from './dto/create-religion.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Data - Religions')
@Controller('/master-data/religions')
export class ReligionController {
  constructor(private readonly religionService: ReligionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new religion record' })
  @ApiResponse({
    status: 201,
    description: 'Master data religion record created successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.CREATE,
    description: 'Create a new religion record',
  })
  async create(@Body() payload: CreateReligionDTO) {
    const result = await this.religionService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Master data religion record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all religion records' })
  @ApiResponse({
    status: 200,
    description: 'Master data religion records retrieved successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.VIEW,
    description: 'Retrieve all religion records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.religionService.findAll(query, [], null, [
      'name',
      'description',
    ]);
    return {
      status_code: 200,
      message: 'Master data religion records retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active religion options' })
  @ApiResponse({
    status: 200,
    description: 'Active religion options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.VIEW,
    description: 'Retrieve active religion options',
  })
  async findActiveList() {
    const result = await this.religionService.findActiveList();
    return {
      status_code: 200,
      message: 'Active religion options retrieved successfully',
      result: result,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a religion record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data religion record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.VIEW,
    description: 'Retrieve a religion record by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.religionService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data religion record retrieved successfully',
      result: result,
    };
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a religion record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data religion record updated successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.UPDATE,
    description: 'Update a religion record by ID',
  })
  async update(@Param('id') id: number, @Body() payload: CreateReligionDTO) {
    const result = await this.religionService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master data religion record updated successfully',
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a religion record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data religion record deleted successfully',
  })
  @Audit({
    tableName: 'mst_religions',
    action: AuditAction.DELETE,
    description: 'Delete a religion record by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.religionService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Master data religion record deleted successfully',
      result: result,
    };
  }
}
