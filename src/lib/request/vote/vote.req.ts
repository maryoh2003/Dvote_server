import RequestBase from "../requestBase";
import { IsString, IsNumber, IsDateString } from "class-validator";

export default class VoteRequest extends RequestBase {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsNumber()
  targetIdx: number;

  @IsDateString()
  expiredAt: Date
}