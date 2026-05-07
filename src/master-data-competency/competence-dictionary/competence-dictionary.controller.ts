import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompetenceDictionaryService } from './competence-dictionary.service';
import { GetTableDto } from 'src/helper/dto/general.dto';
import { AuditAction } from 'src/common/entities/audit-trail.entity';
import { Audit } from 'src/common/decorators/audit.decorator';

@ApiTags('Master Competency - Dictionary')
@Controller('/master-competence/dictionary')
export class CompetenceDictionaryController {
  constructor(
    private readonly competenceDictionaryService: CompetenceDictionaryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated competence dictionary' })
  @ApiResponse({
    status: 200,
    description:
      'Paginated list of competence groups with nested dimensions and levels',
  })
  @Audit({
      tableName: 'mst_competence_types',
      action: AuditAction.VIEW,
      description: 'Data dictionary competence retrieved successfully',
    })
  async getPaginated(@Query() query: GetTableDto) {
    const result =
      await this.competenceDictionaryService.findPaginateDictionary(query);
    return {
      status_code: 200,
      message: 'Successfully retrieved competence dictionary',
      result: result,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get paginated competence dictionary' })
  @ApiResponse({
    status: 200,
    description:
      'Paginated list of competence groups with nested dimensions and levels',
  })
  @Audit({
      tableName: 'mst_competence_types',
      action: AuditAction.VIEW,
      description: 'Data dictionary competence retrieved successfully',
    })
  async getDetail(@Param('id') id: number) {
    const result =
      await this.competenceDictionaryService.getDetailCompetence(id);
    return {
      status_code: 200,
      message: 'Successfully retrieved competence dictionary detail',
      result: result,
    };
  }
}
