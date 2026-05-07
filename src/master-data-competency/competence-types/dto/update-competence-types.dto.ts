import { PartialType } from "@nestjs/swagger";
import { CreateCompetenceTypesDTO } from "./create-compentence-types.dto";

export class UpdateCompetencyTypesDTO extends PartialType(CreateCompetenceTypesDTO){}