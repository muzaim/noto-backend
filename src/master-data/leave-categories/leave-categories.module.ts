import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveCategoriesService } from './leave-categories.service';
import { LeaveCategoriesController } from './leave-categories.controller';
import { LeaveCategoryEntity } from './entities/leave-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeaveCategoryEntity])],
  controllers: [LeaveCategoriesController],
  providers: [LeaveCategoriesService],
  exports: [LeaveCategoriesService],
})
export class LeaveCategoriesModule {}