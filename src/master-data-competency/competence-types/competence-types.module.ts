import { Module } from '@nestjs/common';
import { CompetenceTypesEntity } from './entities/competence-types.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetenceTypesService } from './competence-types.service';
import { CompetenceTypesController } from './competence-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompetenceTypesEntity])],
  providers: [CompetenceTypesService],
  controllers: [CompetenceTypesController],
  exports: [CompetenceTypesService],
})
export class CompetenceTypesModule {}
