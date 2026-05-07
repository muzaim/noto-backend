import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/services/base.service";
import { DocumentTypeEntity } from "./entities/document-types.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AppLogger } from "src/common/logger/app-logger.service";
import { Repository } from "typeorm";

@Injectable()
export class DocumentTypesService extends BaseService<DocumentTypeEntity> {
  constructor(
    @InjectRepository(DocumentTypeEntity)
    private readonly documentTypeRepository: Repository<DocumentTypeEntity>,
    protected readonly logger: AppLogger
  ) {
    super(documentTypeRepository, logger);
    this.logger.setContext(DocumentTypesService.name);
  }
}