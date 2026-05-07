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
import { CurrencyService } from './currency.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCurrencyDTO } from './dto/create-currency.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { Audit } from 'src/common/decorators/audit.decorator';
import { UpdateCurrencyDTO } from './dto/update-currency.dto';

@ApiTags('Master Data - Currencies')
@Controller('/master-data/currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new currency' })
  @ApiResponse({
    status: 201,
    description: 'Currency created successfully',
  })
  @Audit({
    tableName: 'mst_currencies',
    action: AuditAction.CREATE,
    description: 'Create a new currency',
  })
  async create(@Body() payload: CreateCurrencyDTO) {
    const result = await this.currencyService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Currency created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all currencies' })
  @ApiResponse({
    status: 200,
    description: 'Currencies retrieved successfully',
  })
  @Audit({
    tableName: 'mst_currencies',
    action: AuditAction.VIEW,
    description: 'Retrieve all currencies',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.currencyService.findAll(query, [], null, [
      'code',
      'name',
    ]);
    return {
      status_code: 200,
      message: 'Currencies retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active currency options' })
  @ApiResponse({
    status: 200,
    description: 'Active currency options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_currencies',
    action: AuditAction.VIEW,
    description: 'Retrieve active currency options',
  })
  async findActiveList() {
    const result = await this.currencyService.findActiveList();
    return {
      status_code: 200,
      message: 'Active currency options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a currency by ID' })
  @ApiResponse({
    status: 200,
    description: 'Currency retrieved successfully',
  })
  @Audit({
    tableName: 'mst_currencies',
    action: AuditAction.VIEW,
    description: 'Retrieve a currency by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.currencyService.findOne(id);
    return {
      status_code: 200,
      message: 'Currency retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a currency by ID' })
  @ApiResponse({
    status: 200,
    description: 'Currency updated successfully',
  })
  @Audit({
    tableName: 'mst_currencies',
    action: AuditAction.UPDATE,
    description: 'Update a currency by ID',
  })
  async update(@Param('id') id: number, @Body() payload: UpdateCurrencyDTO) {
    const result = await this.currencyService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Currency updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a currency by ID' })
  @ApiResponse({
    status: 200,
    description: 'Currency deleted successfully',
  })
  @Audit({
    tableName: 'mst_currencies',
    action: AuditAction.DELETE,
    description: 'Delete a currency by ID',
  })
  async remove(@Param('id') id: number) {
    const result = await this.currencyService.remove(id);
    return {
      status_code: 200,
      message: 'Currency deleted successfully',
    };
  }
}
