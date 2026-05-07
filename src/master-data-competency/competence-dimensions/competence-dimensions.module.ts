import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenceDimensionsEntity } from './entities/competence.dimensions.entity';
import { CompetenceDimensionsService } from './competence-dimensions.service';
import { CompetenceGroupsModule } from '../competence-groups/competence-groups.module';
import { CompetenceDimensionsController } from './competence-dimensions.controller';
import { DimensionLevelEntity } from '../dimension-levels/entities/dimension-levels.entity';
import { DimensionLevelsModule } from '../dimension-levels/dimension-levels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompetenceDimensionsEntity,
      DimensionLevelEntity,
    ]),
    CompetenceGroupsModule,
    DimensionLevelsModule
  ],
  providers: [CompetenceDimensionsService],
  controllers: [CompetenceDimensionsController],
  exports: [CompetenceDimensionsService],
})
export class CompetenceDimensionsModule {}
