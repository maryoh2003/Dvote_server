import { IsString } from "class-validator"
import MemberRequest from "./member.req";

export default class TeacherRequest extends MemberRequest {
  @IsString()
  position: string;

  @IsString()
  phone: string;
}