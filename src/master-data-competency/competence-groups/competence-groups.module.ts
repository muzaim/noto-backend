import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenceGroupsEntity } from './entities/comptence-groups.entity';
import { CompetenceGroupsService } from './competence-groups.service';
import { CompetenceGroupsController } from './competence-groups.controller';
import { CompetenceTypesModule } from '../competence-types/competence-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompetenceGroupsEntity]),
    CompetenceTypesModule,
  ],
  providers: [CompetenceGroupsService],
  controllers: [CompetenceGroupsController],
  exports: [CompetenceGroupsService],
})
export class CompetenceGroupsModule {}
