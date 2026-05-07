import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationalLevelsEntity } from "./entities/educational-levels.entity";
import { EducationalLevelsService } from "./educational-levels.service";
import { EducationalLevelsController } from "./educational-levels.controller";

@Module({
  imports: [TypeOrmModule.forFeature([EducationalLevelsEntity])],
  providers: [EducationalLevelsService],
  controllers: [EducationalLevelsController],
  exports: [EducationalLevelsService]
})

export class EducationalLevelsModule {}