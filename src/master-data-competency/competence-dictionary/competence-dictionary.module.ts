import { Module } from '@nestjs/common';
import { CompetenceDictionaryController } from './competence-dictionary.controller';
import { CompetenceDictionaryService } from './competence-dictionary.service';
import { CompetenceGroupsModule } from '../competence-groups/competence-groups.module';
import { CompetenceDimensionsModule } from '../competence-dimensions/competence-dimensions.module';
import { DimensionLevelsModule } from '../dimension-levels/dimension-levels.module';
import { CompetenceTypesModule } from '../competence-types/competence-types.module';

@Module({
  imports: [
    CompetenceTypesModule,
    CompetenceGroupsModule,
    CompetenceDimensionsModule,
    DimensionLevelsModule,
  ],
  controllers: [CompetenceDictionaryController],
  providers: [CompetenceDictionaryService],
  exports: [CompetenceDictionaryService],
})
export class CompetencyDictionaryModule {}
