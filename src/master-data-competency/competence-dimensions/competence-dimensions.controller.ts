import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompetenceDimensionsService } from './competence-dimensions.service';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateCompetenceDimensionsDTO } from './dto/create-competence-dimensions.dto';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { UpdateCompetenceDimensionsDTO } from './dto/update-competence-dimensions.dto';

@ApiTags('Master Competency - Dimensions')
@Controller('/master-competence/dimensions')
export class CompetenceDimensionsController {
  constructor(
    private readonly competenceDimensionsService: CompetenceDimensionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new competence dimension record' })
  @ApiResponse({
    status: 201,
    description: 'Master data competence dimension record created successfully',
  })
  @Audit({
    tableName: 'mst_competence_dimensions',
    action: AuditAction.CREATE,
    description: 'Create a new competence dimension record',
  })
  async create(@Body() payload: CreateCompetenceDimensionsDTO) {
    const result =
      await this.competenceDimensionsService.createCompetenceDimension(
        payload,
        '1',
      );

    return {
      status_code: 201,
      message: 'Master data competence dimension record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all competence dimensions' })
  @ApiResponse({
    status: 200,
    description: 'List of all competence dimensions',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.competenceDimensionsService.findAll(
      query,
      ['competenceGroup'],
      null,
      ['name'],
    );
    return {
      status_code: 200,
      message: 'Successfully retrieved competence dimensions',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get all competence dimension options' })
  @ApiResponse({
    status: 200,
    description: 'List of all competence dimension options',
  })
  @Audit({
    tableName: 'mst_competence_dimensions',
    action: AuditAction.VIEW,
    description: 'Retrieve all competence dimension options',
  })
  async findOptions() {
    const result = await this.competenceDimensionsService.findActiveList();
    return {
      status_code: 200,
      message: 'Successfully retrieved competence dimension options',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a competence dimension by ID' })
  @ApiResponse({
    status: 200,
    description: 'Competence dimension record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_competence_dimensions',
    action: AuditAction.VIEW,
    description: 'Retrieve a competence dimension record by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.competenceDimensionsService.findOne(id, [
      'competenceGroup',
      'competenceGroup.competenceType',
      'dimensionLevels',
    ]);
    return {
      status_code: 200,
      message: 'Successfully retrieved competence dimension',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a competence dimension record' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence dimension record updated successfully',
  })
  @Audit({
    tableName: 'mst_competence_dimensions',
    action: AuditAction.UPDATE,
    description: 'Update a competence dimension record',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: UpdateCompetenceDimensionsDTO,
  ) {
    const result =
      await this.competenceDimensionsService.updateCompetenceDimension(
        id,
        payload,
        '1',
      );

    return {
      status_code: 200,
      message: 'Master data competence dimension record updated successfully',
      result: result,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove (set inactive) a competence dimension record',
  })
  @ApiResponse({
    status: 200,
    description:
      'Master data competence dimension record set to inactive successfully',
  })
  @Audit({
    tableName: 'mst_competence_dimensions',
    action: AuditAction.DELETE,
    description: 'Set competence dimension record to inactive',
  })
  async remove(@Param('id') id: number) {
    await this.competenceDimensionsService.removeCompetenceDimension(id, '1');
    return {
      status_code: 200,
      message:
        'Master data competence dimensions record set to inactive successfully',
    };
  }
}
