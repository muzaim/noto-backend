import { PartialType } from "@nestjs/swagger";
import { CreateClassificationDTO } from "./create-classification.dto";

export class UpdateClassificationDTO extends PartialType(CreateClassificationDTO){}