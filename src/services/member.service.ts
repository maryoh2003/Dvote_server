import { Service } from "typedi";
import { InjectRepository } from 'typeorm-typedi-extensions';
import MemberRepository from "@repository/member.repository";
import Member from '@models/member';
import { MemberType } from "@lib/enum/member";
import StudentRepository from "@repository/student.repository";
import StudentRequest from "@lib/request/auth/student.req";
import { getManager } from "typeorm";
import TeacherRequest from "@lib/request/auth/teacher.req";
import TeacherRepository from "@repository/teacher.repository";
import errors from "@lib/errors";
import CustomError from "@lib/errors/customError";
import LoginRequest from "@lib/request/auth/login.req";

@Service()
export default class MemberService {

  constructor(
    @InjectRepository()
    private readonly memberRepository: MemberRepository,
    @InjectRepository()
    private readonly studentRepository: StudentRepository,
    @InjectRepository()
    private readonly teacherRepository: TeacherRepository,
  ) { }

  public getMember = async (email: string): Promise<Member | null> => {
    const member = await this.memberRepository.findOne(email);
    if (member === undefined) {
      return null;
    }
    return member;
  }

  /**
   * @description 회원 존재 여부 확인
   * @param email 이메일
   */
  public isExist = async (email: string): Promise<boolean> => {
    const member = await this.memberRepository.getMemberByEmail(email);
    if (member === undefined) {
      return false;
    }
    return true;
  }

  /**
   * @description 학생 회원가입
   */
  public registerStudent = async (data: StudentRequest): Promise<void> => {
    const member = this.memberRepository.create(data);
    member.memberType = MemberType.STUDENT;

    const student = this.studentRepository.create(data);

    await getManager().transaction(async (manager) => {
      const createdMember = await this.memberRepository.addMember(manager, member);

      student.member = createdMember;
      await this.studentRepository.addStudent(manager, student);
    })
  }


  /**
   * @description 교사 회원가입
   */
  public registerTeacher = async (data: TeacherRequest): Promise<void> => {
    const member = this.memberRepository.create(data);
    member.memberType = MemberType.TEACHER;

    const teacher = this.teacherRepository.create(data);

    await getManager().transaction(async (manager) => {
      const createdMember = await this.memberRepository.addMember(manager, member);

      teacher.member = createdMember;
      await this.teacherRepository.addTeacher(manager, teacher);
    })
  }

  /**
   * @description 로그인
   */
  public login = async (data: LoginRequest): Promise<Member> => {
    const member = await this.memberRepository.getMemberByEmailAndPw(data.email, data.pw);

    if (member === undefined) {
      throw new CustomError({
        code: 401,
        message: '인증 실패',
      });
    }

    if (member.isAllowed == false) {
      throw new CustomError({
        code: 403,
        message: '승인되지 않은 회원',
      });
    }

    return member;
  }

  public isCheckAllowed = async (member: Member) => {
    if (member.isAllowed) {
      throw new CustomError({
        code: 409,
        message: '이미 승인된 회원',
      });
    }
  }

  /**
   * @description 회원 승인
   */
  public allowMember = async (email: string) => {
    const member = await this.getMember(email);

    if (member === null) {
      throw new CustomError(errors.NoMember);
    }
    await this.isCheckAllowed(member);
    await this.memberRepository.allowMember(email);
  }

  /**
   * @description 회원 거절
   */
  public denyMember = async (email: string) => {
    const member = await this.getMember(email);

    if (member === null) {
      throw new CustomError(errors.NoMember);
    }
    await this.isCheckAllowed(member);
    await this.memberRepository.remove(member);
  }
}