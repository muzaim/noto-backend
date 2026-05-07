import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationsEntity } from './entities/classifications.entity';
import { ClassificationsService } from './classification.service';
import { ClassificationController } from './classification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClassificationsEntity])],
  providers: [ClassificationsService],
  controllers: [ClassificationController],
  exports: [ClassificationsService]
})
export class ClassificationsModule {}
