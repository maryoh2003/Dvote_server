import { IsBoolean, IsNumber, IsString } from "class-validator";
import RequestBase from '../requestBase';

export default class OptionRequest extends RequestBase {
  @IsNumber()
  questionIdx: number;

  @IsString()
  option: string;

  @IsBoolean()
  isMultiple: boolean;
}