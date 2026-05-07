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
import { CompetenceGroupsService } from './competence-groups.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audit } from 'src/common/decorators/audit.decorator';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { CreateCompetenceGroupDTO } from './dto/create-competence-groups.dto';
import { GetOptionsDTO, GetTableDto } from 'src/helper/dto/general.dto';

@ApiTags('Master Competence - Groups')
@Controller('/master-competence/groups')
export class CompetenceGroupsController {
  constructor(
    private readonly competenceGroupsService: CompetenceGroupsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new competence group record' })
  @ApiResponse({
    status: 201,
    description: 'Master data competence group record created successfully',
  })
  @Audit({
    tableName: 'mst_competence_groups',
    action: AuditAction.CREATE,
    description: 'Create a new competence group record',
  })
  async create(@Body() payload: CreateCompetenceGroupDTO) {
    const result = await this.competenceGroupsService.createCompetenceGroup(
      payload,
      '1',
    );
    return {
      status_code: 201,
      message: 'Master data competence group record created successfully',
      result: result,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all competence group records' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence group records retrieved successfully',
  })
  @Audit({
    tableName: 'mst_competence_groups',
    action: AuditAction.VIEW,
    description: 'Retrieve all competence group records',
  })
  async findAll(@Query() query: GetTableDto) {
    const result = await this.competenceGroupsService.findAll(query, [
      'competenceType',
    ]);
    return {
      status_code: 200,
      message: 'Master data competence group records retrieved successfully',
      result: result,
    };
  }

  @Get('/options')
  @ApiOperation({ summary: 'Get competence group options' })
  @ApiResponse({
    status: 200,
    description: 'Competence group options retrieved successfully',
  })
  @Audit({
    tableName: 'mst_competence_groups',
    action: AuditAction.VIEW,
    description: 'Retrieve competence group options',
  })
  async findAllActive(@Query() query: GetOptionsDTO) {
    const result = await this.competenceGroupsService.findActiveList(query);
    return {
      status_code: 200,
      message: 'Competence group options retrieved successfully',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a competence group record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence group record retrieved successfully',
  })
  @Audit({
    tableName: 'mst_competence_groups',
    action: AuditAction.VIEW,
    description: 'Retrieve a competence group record by ID',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.competenceGroupsService.findOne(id, [
      'competenceType',
    ]);
    return {
      status_code: 200,
      message: 'Master data competence group record retrieved successfully',
      result: result,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a competence group record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence group record updated successfully',
  })
  @Audit({
    tableName: 'mst_competence_groups',
    action: AuditAction.UPDATE,
    description: 'Update a competence group record by ID',
  })
  async update(
    @Param('id') id: number,
    @Body() payload: CreateCompetenceGroupDTO,
  ) {
    const result = await this.competenceGroupsService.updateCompetenceGroup(
      id,
      payload,
      '1',
    );
    return {
      status_code: 200,
      message: 'Master data competence group record updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a competence group record by ID' })
  @ApiResponse({
    status: 200,
    description: 'Master data competence group record deleted successfully',
  })
  @Audit({
    tableName: 'mst_competence_groups',
    action: AuditAction.DELETE,
    description: 'Delete a competence group record by ID',
  })
  async delete(@Param('id') id: number) {
    const result = await this.competenceGroupsService.remove(id);
    return {
      status_code: 200,
      message: 'Master data competence group record deleted successfully',
    };
  }
}
