import RequestBase from '../requestBase';
import { IsString, IsEmail, IsNumber, IsEnum } from 'class-validator';
import { MemberType } from '@lib/enum/member';

export default class MemberRequest extends RequestBase {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  pw: string;

  @IsString()
  name: string;

  @IsEnum(MemberType)
  memberType: MemberType;
}