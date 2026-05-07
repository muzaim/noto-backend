import { PartialType } from "@nestjs/swagger";
import { CreateCompetenceGroupDTO } from "./create-competence-groups.dto";

export class UpdateCompetenceGroupDTO extends PartialType(CreateCompetenceGroupDTO) {}