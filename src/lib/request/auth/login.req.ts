import RequestBase from '../requestBase';
import { IsString } from 'class-validator';

export default class LoginRequest extends RequestBase {
  @IsString()
  email: string;

  @IsString()
  pw: string;
}