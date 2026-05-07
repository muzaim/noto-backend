import { Injectable } from '@nestjs/common';
import { CompetenceGroupsEntity } from './entities/comptence-groups.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { ActiveStatus } from 'src/database/enumlist';
import { CreateCompetenceGroupDTO } from './dto/create-competence-groups.dto';
import { CompetenceTypesService } from '../competence-types/competence-types.service';

@Injectable()
export class CompetenceGroupsService extends BaseService<CompetenceGroupsEntity> {
  constructor(
    @InjectRepository(CompetenceGroupsEntity)
    private competenceGroupsRepository: Repository<CompetenceGroupsEntity>,
    private readonly competenceTypeService: CompetenceTypesService,
    protected readonly logger: AppLogger,
  ) {
    super(competenceGroupsRepository);
    this.logger.setContext(CompetenceGroupsService.name);
  }

  async createCompetenceGroup(
    payload: CreateCompetenceGroupDTO,
    userId: string,
  ) {
    this.logger.log(
      `[createCompetenceGroup] Creating competence group with payload: ${JSON.stringify(payload)} for user: ${userId}`,
    );
    const competenceType = await this.competenceTypeService.findOne(
      payload.competence_type_id,
    );

    if (!competenceType) {
      this.logger.warn(
        `[createCompetenceGroup] Competence type with ID ${payload.competence_type_id} not found`,
      );
      throw new Error(
        `Competence type with ID ${payload.competence_type_id} not found`,
      );
    }

    const competenceGroup = this.competenceGroupsRepository.create({
      ...payload,
      createdBy: userId,
      updatedBy: userId,
      competenceType: competenceType,
    });
    const savedGroup =
      await this.competenceGroupsRepository.save(competenceGroup);

    this.logger.log(
      `[createCompetenceGroup] Successfully created competence group with ID: ${savedGroup.id}`,
    );

    return savedGroup;
  }

  async updateCompetenceGroup(id: number, payload: CreateCompetenceGroupDTO, userId: string) {
    this.logger.log(`[update] Updating competence group with ID: ${id} using payload: ${JSON.stringify(payload)} for user: ${userId}`,);
    const competenceGroup = await this.findOne(id);

    if (!competenceGroup) {
      this.logger.warn(`[update] Competence group with ID ${id} not found`);
      throw new Error(`Competence group with ID ${id} not found`);
    }

    const competenceType = await this.competenceTypeService.findOne(
      payload.competence_type_id,
    );

    if (!competenceType) {
      this.logger.warn(
        `[update] Competence type with ID ${payload.competence_type_id} not found`,
      );
      throw new Error(
        `Competence type with ID ${payload.competence_type_id} not found`,
      );
    }

    const updatedGroup = {
      ...competenceGroup,
      ...payload,
      updatedBy: userId,
      competenceType: competenceType,
    };
    const result = await this.competenceGroupsRepository.save(updatedGroup);
    this.logger.log(
      `[update] Successfully updated competence group with ID: ${id}`,
    );
    return result;
  }

  async countByCompetenceType(competenceTypeId: number): Promise<number> {
    this.logger.log(
      `[countByCompetenceType] Counting groups for competence type ID: ${competenceTypeId}`,
    );
    const count = await this.competenceGroupsRepository.count({
      where: { competenceTypeId },
    });
    return count;
  }
}
