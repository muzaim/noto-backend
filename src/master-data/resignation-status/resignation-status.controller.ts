import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Audit } from "src/common/decorators/audit.decorator";
import { AuditAction } from "src/common/entities/audit-trail.entity";
import { CreateResignationStatusDTO } from "./dto/create-resignation-status.dto";
import { UpdateResignationStatusDTO } from "./dto/update-resignation-status.dto";
import { ResignationStatusService } from "./resignation-status.service";
import { GetTableDto } from "src/helper/dto/general.dto";

@ApiTags('Master Data - Resignation Status')
@Controller('/master-data/resignation-status')
export class ResignationStatusController {
  constructor(private readonly resignationStatusService: ResignationStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new resignation status record' })
  @ApiResponse({
    status: 201,
    description: 'Master data resignation status record created successfully'
  })
  @Audit({
    tableName: 'mst_resignation_status',
    action: AuditAction.CREATE,
    description: 'Create a new resignation status record'
  })
  async create(@Body() payload: CreateResignationStatusDTO) {
    const result = await this.resignationStatusService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Master data resignation status record created successfully',
      result: result
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all resignation status records' })
  @ApiResponse({
    status: 200,
    description: 'Master data resignation status records retrieved successfully'
  })
  @Audit({
    tableName: 'mst_resignation_status',
    action: AuditAction.VIEW,
    description: 'Retrieve all resignation status records'
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.resignationStatusService.findAll(query, [], null, [
      'name',
      'description'
    ]);
    return {
      status_code: 200,
      message: 'Master data resignation status records retrieved successfully',
      result: result
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get active resignation status options' })
  @ApiResponse({
    status: 200,
    description: 'Active resignation status options retrieved successfully'
  })
  @Audit({
    tableName: 'mst_resignation_status',
    action: AuditAction.VIEW,
    description: 'Retrieve active resignation status options'
  })
  async findActiveList() {
    const result = await this.resignationStatusService.findActiveList();
    return {
      status_code: 200,
      message: 'Active resignation status options retrieved successfully',
      result: result
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a resignation status record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data resignation status record retrieved successfully'
  })
  @Audit({
    tableName: 'mst_resignation_status',
    action: AuditAction.VIEW,
    description: 'Retrieve a resignation status record by ID'
  })
  async findOne(@Param('id') id: number) {
    const result = await this.resignationStatusService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data resignation status record retrieved successfully',
      result: result
    };
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a resignation status record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data resignation status record updated successfully'
  })
  @Audit({
    tableName: 'mst_resignation_status',
    action: AuditAction.UPDATE,
    description: 'Update a resignation status record by ID'
  })
  async update(@Param('id') id: number, @Body() payload: UpdateResignationStatusDTO) {
    const result = await this.resignationStatusService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master data resignation status record updated successfully',
      result: result
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a resignation status record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data resignation status record deleted successfully'
  })
  @Audit({
    tableName: 'mst_resignation_status',
    action: AuditAction.DELETE,
    description: 'Delete a resignation status record by ID'
  })
  async remove(@Param('id') id: number) {
    const result = await this.resignationStatusService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Master data resignation status record deleted successfully',
      result: result
    };
  }
}