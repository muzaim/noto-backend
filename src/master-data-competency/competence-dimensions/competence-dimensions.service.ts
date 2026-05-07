import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/services/base.service';
import { CompetenceDimensionsEntity } from './entities/competence.dimensions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { Repository } from 'typeorm';
import { CreateCompetenceDimensionsDTO } from './dto/create-competence-dimensions.dto';
import { CompetenceGroupsService } from '../competence-groups/competence-groups.service';
import { DimensionLevelEntity } from '../dimension-levels/entities/dimension-levels.entity';
import { DimensionLevelsService } from '../dimension-levels/dimension-levels.service';
import { UpdateCompetenceDimensionsDTO } from './dto/update-competence-dimensions.dto';
import { ActiveStatus } from 'src/database/enumlist';

@Injectable()
export class CompetenceDimensionsService extends BaseService<CompetenceDimensionsEntity> {
  constructor(
    @InjectRepository(CompetenceDimensionsEntity)
    private competenceDimensionsRepository: Repository<CompetenceDimensionsEntity>,

    private readonly dimensionLevelService: DimensionLevelsService,
    private readonly competenceGroupsService: CompetenceGroupsService,
    protected readonly logger: AppLogger,
  ) {
    super(competenceDimensionsRepository);
    this.logger.setContext(CompetenceDimensionsService.name);
  }

  async createCompetenceDimension(
    payload: CreateCompetenceDimensionsDTO,
    userId: string,
  ) {
    this.logger.log(
      `[createCompetenceDimensions] Creating competence dimension with payload: ${JSON.stringify(payload)} for user: ${userId}`,
    );

    const competenceGroup = await this.competenceGroupsService.findOne(
      payload.competence_group_id,
    );

    if (!competenceGroup) {
      this.logger.warn(
        `[createCompetenceDimensions] Competence group with ID ${payload.competence_group_id} not found`,
      );
      throw new Error(
        `Competence group with ID ${payload.competence_group_id} not found`,
      );
    }

    return await this.competenceDimensionsRepository.manager.transaction(
      async (manager) => {
        // 1. Save Parent Dimension lewat manager
        const competenceDimension = manager.create(CompetenceDimensionsEntity, {
          ...payload,
          createdBy: userId,
          updatedBy: userId,
          competenceGroup: competenceGroup,
        });

        const savedDimension = await manager.save(competenceDimension);

        // 2. Save Child Levels lewat service yang udah kita benerin tadi
        if (payload.levels && payload.levels.length > 0) {
          await this.dimensionLevelService.createBulkDimensionLevels(
            savedDimension.id,
            payload.levels,
            userId,
            manager,
          );
        }

        this.logger.log(
          `[createCompetenceDimensions] Successfully created ID: ${savedDimension.id}`,
        );

        return savedDimension;
      },
    );
  }

  async updateCompetenceDimension(
    id: number,
    payload: UpdateCompetenceDimensionsDTO,
    userId: string,
  ) {
    this.logger.log(
      `[updateCompetenceDimensions] Updating competence dimension ID: ${id} with payload: ${JSON.stringify(payload)} for user: ${userId}`,
    );

    const existingDimension = await this.findOne(id, ['competenceGroup']);
    if (!existingDimension) {
      throw new Error(`Competence dimension with ID ${id} not found`);
    }

    let competenceGroup = existingDimension.competenceGroup;
    if (payload.competence_group_id) {
      competenceGroup = await this.competenceGroupsService.findOne(
        payload.competence_group_id,
      );
      if (!competenceGroup) {
        this.logger.warn(
          `[updateCompetenceDimensions] Competence group with ID ${payload.competence_group_id} not found`,
        );
        throw new Error(
          `Competence group with ID ${payload.competence_group_id} not found`,
        );
      }
    }

    return await this.competenceDimensionsRepository.manager.transaction(
      async (manager) => {
        // 1. Update Parent Dimension - extract only entity properties
        const { competence_group_id, levels, ...updatePayload } = payload;
        
        const updateData = {
          ...updatePayload,
          updatedBy: userId,
          ...(competenceGroup && { competenceGroup }),
        };

        await manager.update(CompetenceDimensionsEntity, id, updateData);

        // 2. Handle Child Levels bulk update
        if (payload.levels !== undefined) {
          await this.dimensionLevelService.updateBulkDimensionLevels(
            id,
            payload.levels,
            userId,
            manager,
          );
        }

        this.logger.log(
          `[updateCompetenceDimensions] Successfully updated ID: ${id}`,
        );

        return await this.findOne(id, ['competenceGroup']);
      },
    );
  }

  async countByCompetenceTypeGroups(competenceTypeId: number): Promise<number> {
    this.logger.log(
      `[countByCompetenceTypeGroups] Counting active dimensions for competence type ID: ${competenceTypeId}`,
    );

    // Count active dimensions that belong to groups of this competence type
    const count = await this.competenceDimensionsRepository
      .createQueryBuilder('dimension')
      .innerJoinAndSelect(
        'dimension.competenceGroup',
        'group',
        'group.competence_type_id = :typeId',
        { typeId: competenceTypeId },
      )
      .where('dimension.status = :status', { status: ActiveStatus.Active })
      .getCount();

    this.logger.log(
      `[countByCompetenceTypeGroups] Successfully counted ${count} active dimensions for competence type ID: ${competenceTypeId}`,
    )
    return count;
  }

  async removeCompetenceDimension(id: number, userId: string): Promise<void> {
    this.logger.log(
      `[removeCompetenceDimension] Removing (setting inactive) competence dimension ID: ${id} for user: ${userId}`,
    );

    const existingDimension = await this.findOne(id);
    if (!existingDimension) {
      throw new Error(`Competence dimension with ID ${id} not found`);
    }

    return await this.competenceDimensionsRepository.manager.transaction(
      async (manager) => {
        // 1. Set dimension status to Inactive
        await manager.update(CompetenceDimensionsEntity, id, {
          status: ActiveStatus.Inactive,
          updatedBy: userId,
        });

        // 2. Set all related levels to Inactive
        await manager.update(DimensionLevelEntity, 
          { competenceDimension: { id } },
          {
            status: ActiveStatus.Inactive,
            updatedBy: userId,
          }
        );

        this.logger.log(
          `[removeCompetenceDimension] Successfully set dimension ID: ${id} and its levels to inactive`,
        );
      },
    );
  }
}
