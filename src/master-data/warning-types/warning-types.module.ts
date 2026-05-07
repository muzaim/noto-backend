import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarningTypesService } from './warning-types.service';
import { WarningTypesController } from './warning-types.controller';
import { WarningTypeEntity } from './entities/warning-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WarningTypeEntity])],
  controllers: [WarningTypesController],
  providers: [WarningTypesService],
  exports: [WarningTypesService],
})
export class WarningTypesModule {}