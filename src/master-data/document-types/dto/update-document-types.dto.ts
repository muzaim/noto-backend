import { PartialType } from "@nestjs/swagger";
import { CreateDocumentTypesDTO } from "./create-document-types.dto";

export class UpdateDocumentTypesDTO extends PartialType(CreateDocumentTypesDTO) {}