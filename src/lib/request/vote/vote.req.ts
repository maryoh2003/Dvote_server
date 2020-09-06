import RequestBase from "../requestBase";
import { IsString, IsNumber, IsDateString } from "class-validator";

export default class VoteRequest extends RequestBase {
  @IsString()
  title: string;

  @IsNumber()
  targetGroupIdx: number;

  @IsDateString()
  scheduledAt: Date;

  @IsDateString()
  expiredAt: Date
}