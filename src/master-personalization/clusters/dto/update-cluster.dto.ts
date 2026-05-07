import { PartialType } from "@nestjs/swagger";
import { CreateClusterDTO } from "./create-cluster.dto";

export class UpdateClusterDTO extends PartialType(CreateClusterDTO){}
