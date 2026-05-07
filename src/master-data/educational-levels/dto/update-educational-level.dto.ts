
import { PartialType } from "@nestjs/swagger";
import { CreateEducationalLevelDTO } from "./create-educational-level.dto";

export class UpdateEducationalLevelDTO extends PartialType(CreateEducationalLevelDTO) {}