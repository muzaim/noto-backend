import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DimensionLevelEntity } from "./entities/dimension-levels.entity";
import { DimensionLevelsService } from "./dimension-levels.service";

@Module({
  imports: [TypeOrmModule.forFeature([DimensionLevelEntity])],
  providers: [DimensionLevelsService],
  exports: [DimensionLevelsService]
})

export class DimensionLevelsModule {}