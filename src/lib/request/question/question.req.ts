import { IsNumber, IsString } from 'class-validator';
import RequestBase from '../requestBase';

export default class QuestionRequest extends RequestBase {
  @IsString()
  question: string;

  @IsNumber()
  voteIdx: number;
}