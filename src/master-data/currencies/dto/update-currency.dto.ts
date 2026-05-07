import { PartialType } from "@nestjs/swagger";
import { CreateCurrencyDTO } from "./create-currency.dto";

export class UpdateCurrencyDTO extends PartialType(CreateCurrencyDTO) {}