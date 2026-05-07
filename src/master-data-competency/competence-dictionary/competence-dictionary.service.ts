import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CompetenceTypesService } from '../competence-types/competence-types.service';
import { CompetenceGroupsService } from '../competence-groups/competence-groups.service';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { GetTableDto, SortType } from 'src/helper/dto/general.dto';
import { CompetenceDimensionsService } from '../competence-dimensions/competence-dimensions.service';
import { ActiveStatus } from 'src/database/enumlist';

@Injectable()
export class CompetenceDictionaryService {
  constructor(
    private readonly competenceTypesService: CompetenceTypesService,
    private readonly competenceGroupService: CompetenceGroupsService,
    private readonly competenceDimensionService: CompetenceDimensionsService,
    protected readonly logger: AppLogger,
  ) {
    this.logger.setContext(CompetenceDictionaryService.name);
  }

  async findPaginateDictionary(payload: GetTableDto) {
    this.logger.log(
      '[findPaginateDictionary] Starting pagination for competence dictionary',
    );

    const page = (payload.page || 1) - 1;
    const limit = payload.limit || 10;
    const sortBy = payload.sort_by || 'id';
    const orderBy = payload.order_by || SortType.ASC;
    const keyword = payload.term?.trim();

    // Get paginated competence types
    const competenceTypesResult = await this.competenceTypesService.findAll({
      page: page + 1,
      limit,
      sort_by: sortBy,
      order_by: orderBy,
      term: keyword,
    });

    // Enrich data with counts from related entities
    const enrichedData = await Promise.all(
      competenceTypesResult.data.map(async (competenceType) => {
        // Get count of competence groups for this type
        const groupsCount =
          await this.competenceGroupService.countByCompetenceType(
            competenceType.id,
          );

        // Get count of dimensions through groups (dimension only has group_id, not type_id)
        const dimensionsCount =
          await this.competenceDimensionService.countByCompetenceTypeGroups(
            competenceType.id,
          );

        return {
          id: competenceType.id,
          type_competence_name: competenceType.name,
          total_competence_groups: groupsCount,
          total_dimensions: dimensionsCount,
        };
      }),
    );

    return {
      data: enrichedData,
      meta: {
        page: competenceTypesResult.meta.page,
        per_page: competenceTypesResult.meta.per_page,
        total_items: competenceTypesResult.meta.total_items,
        total_pages: competenceTypesResult.meta.total_pages,
      },
    };
  }

  async getDetailCompetence(typeId: number) {
    this.logger.log(
      `[getDetailCompetence] Starting get competence detail for type ID: ${typeId}`,
    );

    // Validation
    if (!typeId || typeId <= 0) {
      this.logger.warn(`[getDetailCompetence] Invalid type ID: ${typeId}`);
      throw new BadRequestException('ID tipe kompetensi tidak valid');
    }

    const competenceType = await this.competenceTypesService
      .getRepository()
      .createQueryBuilder('type')
      .leftJoinAndSelect(
        'type.competenceGroups',
        'group',
        'group.status = :groupStatus',
        { groupStatus: ActiveStatus.Active },
      )
      .leftJoinAndSelect(
        'group.competenceDimension',
        'dim',
        'dim.status = :dimStatus',
        { dimStatus: ActiveStatus.Active },
      )
      .leftJoinAndSelect(
        'dim.dimensionLevels',
        'level',
        'level.status = :levelStatus',
        { levelStatus: ActiveStatus.Active },
      )
      .where('type.id = :typeId', { typeId })
      .getOne();

    if (!competenceType) {
      this.logger.warn(
        `[getDetailCompetence] Competence type not found with ID: ${typeId}`,
      );
      throw new NotFoundException(
        `Competence type not found with ID: ${typeId}`,
      );
    }

    // Format response
    const formattedGroups = (competenceType.competenceGroups || []).map(
      (group: any) => ({
        name: group.name,
        code: group.code,
        definition: group.definition,
        status: group.status,
        dimensions: (group.competenceDimension || []).map((dimension: any) => ({
          name: dimension.name,
          status: dimension.status,
          levels: (dimension.dimensionLevels || []).map((level: any) => ({
            level_name: level.level_name,
            description: level.description,
            status: level.status,
          })),
        })),
      }),
    );

    this.logger.log(
      `[getDetailCompetence] Retrieved record Competence Dictionary with Competence Type ID: ${typeId} Successfully`,
    );

    return {
      id: competenceType.id,
      type_competence_name: competenceType.name,
      status: competenceType.status,
      competence_groups: formattedGroups,
    };
  }
}
