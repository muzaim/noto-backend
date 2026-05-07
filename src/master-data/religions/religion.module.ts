import { Module } from '@nestjs/common';
import { ReligionService } from './religion.service';
import { ReligionEntity } from './entities/religion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReligionController } from './religion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReligionEntity])],
  providers: [ReligionService],
  controllers: [ReligionController],
  exports: [ReligionService],
})
export class ReligionModule {}
