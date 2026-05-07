import { Module } from "@nestjs/common";
import { DocumentTypeEntity } from "./entities/document-types.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentTypesService } from "./document-types.service";
import { DocumentTypesController } from "./document-types.controller";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentTypeEntity])],
  providers: [DocumentTypesService],
  controllers: [DocumentTypesController],
  exports: [DocumentTypesService],
})

export class DocumentTypesModule {}