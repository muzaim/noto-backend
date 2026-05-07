import { Injectable } from '@nestjs/common';
import { DimensionLevelEntity } from './entities/dimension-levels.entity';
import { BaseService } from 'src/common/services/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AppLogger } from 'src/common/logger/app-logger.service';
import { CreateDimensionLevelsDTO } from './dto/create-dimension-levels.dto';
import { ActiveStatus } from 'src/database/enumlist';

@Injectable()
export class DimensionLevelsService extends BaseService<DimensionLevelEntity> {
  constructor(
    @InjectRepository(DimensionLevelEntity)
    private dimensionLevelsRepository: Repository<DimensionLevelEntity>,

    protected readonly logger: AppLogger,
  ) {
    super(dimensionLevelsRepository);
    this.logger.setContext(DimensionLevelsService.name);
  }

  async createBulkDimensionLevels(
    dimensionId: number,
    payload: CreateDimensionLevelsDTO[],
    userId: string,
    manager?: EntityManager,
  ) {
    this.logger.log(
      `[createBulkDimensionLevels] Creating ${payload.length} levels for dimension ID: ${dimensionId}`,
    );

    const repo = manager
      ? manager.getRepository(DimensionLevelEntity)
      : this.repository;

    const levels = payload.map((data) =>
      repo.create({
        ...data,
        competenceDimension: { id: dimensionId },
        createdBy: userId,
        updatedBy: userId,
      }),
    );

    const savedLevels = await repo.save(levels);

    this.logger.log(
      `[createBulkDimensionLevels] Successfully created ${savedLevels.length} levels.`,
    );

    return savedLevels;
  }

  async updateBulkDimensionLevels(
    dimensionId: number,
    payload: CreateDimensionLevelsDTO[],
    userId: string,
    manager?: EntityManager,
  ) {
    this.logger.log(
      `[updateBulkDimensionLevels] Updating levels for dimension ID: ${dimensionId} with ${payload.length} levels`,
    );

    const repo = manager
      ? manager.getRepository(DimensionLevelEntity)
      : this.repository;

    // Get existing levels
    const existingLevels = await repo.find({
      where: { competenceDimension: { id: dimensionId } },
    });

    // Build payload map by level_name
    const payloadMap = new Map(
      payload
        .filter((p) => p.level_name)
        .map((p) => [p.level_name, p]),
    );

    // Levels yang level_name-nya tidak ada di payload atau kosong → INACTIVE
    const levelNamesToDeactivate = existingLevels
      .filter((level) => !payloadMap.has(level.level_name) || !level.level_name)
      .map((level) => level.id);

    if (levelNamesToDeactivate.length > 0) {
      await repo.update(levelNamesToDeactivate, {
        status: ActiveStatus.Inactive,
        updatedBy: userId,
      });
      this.logger.log(
        `[updateBulkDimensionLevels] Deactivated ${levelNamesToDeactivate.length} levels.`,
      );
    }

    // Process all payload items
    const processedLevels = await Promise.all(
      payload.map(async (data) => {
        // Skip jika level_name kosong
        if (!data.level_name) {
          return null;
        }

        const existingLevel = existingLevels.find(
          (level) => level.level_name === data.level_name,
        );

        if (existingLevel) {
          // UPDATE case
          const updateData = {
            ...data,
            status: ActiveStatus.Active,
            updatedBy: userId,
          };
          await repo.update(existingLevel.id, updateData);
          return repo.findOne({ where: { id: existingLevel.id } });
        } else {
          // CREATE case
          const newLevel = repo.create({
            ...data,
            competenceDimension: { id: dimensionId },
            createdBy: userId,
            updatedBy: userId,
          });
          return repo.save(newLevel);
        }
      }),
    );

    const filteredLevels = processedLevels.filter((level) => level !== null);

    this.logger.log(
      `[updateBulkDimensionLevels] Successfully processed ${filteredLevels.length} levels.`,
    );

    return filteredLevels;
  }
}
