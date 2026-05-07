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
import { CompetenceTypesService } from './competence-types.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { Audit } from 'src/common/decorators/audit.decorator';
import { CreateCompetenceTypesDTO } from './dto/create-compentence-types.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { UpdateCompetencyTypesDTO } from './dto/update-competence-types.dto';

@ApiTags('Master Competence - Types')
@Controller('/master-competence/types')
export class CompetenceTypesController {
  constructor(
    private readonly competenceTypesService: CompetenceTypesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new competence type record' })
  @ApiResponse({
    status: 201,
    description: 'Master data competence type record created successfully',
  })
  @Audit({
    tableName: 'mst_competence_types',
    action: AuditAction.CREATE,
    description: 'Create a new competence type record',
  })
  async create(@Body() payload: CreateCompetenceTypesDTO) {
    const result = await this.competenceTypesService.create(payload, 1);
    return {
      status_code: 201,
      message: 'Master data competence type record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all competence type records' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence type records retrieved successfully',
  })
  @Audit({
    tableName: 'mst_competence_types',
    action: AuditAction.VIEW,
    description: 'Retrieve all competence type records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.competenceTypesService.findAll(query);
    return {
      status_code: 200,
      message: 'Master data competence type records retrieved successfully',
      result: result,
    };
  }

  @Get('options')
  @ApiOperation({ summary: 'Get competence type options' })
  @ApiResponse({
    status: 200,
    description: 'Competence type options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_competence_types',
    action: AuditAction.VIEW,
    description: 'Retrieve competence type options',
  })
  async findAllActive(@Query() query: GetTableDto) {
    const result = await this.competenceTypesService.findActiveList(query, [
      'name',
    ]);
    return {
      status_code: 200,
      message: 'Competence type options retrieved successfully',
      result: result,
    };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a competence type record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence type record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_competence_types',
    action: AuditAction.VIEW,
    description: 'Retrieve a competence type record by ID',
  })
  async findOne(@Query('id') id: number) {
    const result = await this.competenceTypesService.findOne(id);
    return {
      status_code: 200,
      message: 'Master data competence type record retrieved successfully',
      result: result,
    };
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a competence type record' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence type record updated successfully',
  })
  @Audit({
    tableName: 'mst_competence_types',
    action: AuditAction.UPDATE,
    description: 'Update a competence type record',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateCompetencyTypesDTO,
  ) {
    const result = await this.competenceTypesService.update(id, payload, 1);
    return {
      status_code: 200,
      message: 'Master data competence type record updated successfully',
      result: result,
    };
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a competence type record' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence type record deleted successfully',
  })
  @Audit({
    tableName: 'mst_competence_types',
    action: AuditAction.DELETE,
    description: 'Delete a competence type record',
  })
  async remove(@Param('id') id: number) {
    const result = await this.competenceTypesService.remove(id, 1);
    return {
      status_code: 200,
      message: 'Master data competence type record deleted successfully',
    };
  }
}
