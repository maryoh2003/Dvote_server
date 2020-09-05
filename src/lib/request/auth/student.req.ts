import { IsNumber, IsString, IsPhoneNumber } from "class-validator";
import MemberRequest from "./member.req";

export default class StudentRequest extends MemberRequest {
  @IsNumber()
  grade: number;

  @IsNumber()
  classroom: number;

  @IsNumber()
  studentNumber: number;
}