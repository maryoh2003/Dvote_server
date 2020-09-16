import { IsNumber } from "class-validator";
import RequestBase from "../requestBase";

export default class optionChoiceRequest extends RequestBase {
  @IsNumber()
  optionIdx: number;
}