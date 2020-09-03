import { Service } from "typedi";
import { InjectRepository } from 'typeorm-typedi-extensions';
import MemberRepository from "@repository/member.repository";
import MemberRequest from "@lib/request/auth/member.req";
import { MemberType } from "@lib/enum/member";
import StudentRepository from "@repository/student.repository";
import StudentRequest from "@lib/request/auth/student.req";
import { getManager } from "typeorm";
import TeacherRequest from "@lib/request/auth/teacher.req";
import TeacherRepository from "@repository/teacher.repository";

@Service()
export default class MemberService {

  constructor(
    @InjectRepository()
    private readonly memberRepository: MemberRepository,
    private readonly studentRepository: StudentRepository,
    private readonly teacherRepository: TeacherRepository,
  ) { }

  /**
   * @description 회원 존재 여부 확인
   * @param email 이메일
   */
  public isExist = async (email: string): Promise<boolean> => {
    const member = this.memberRepository.getMemberByEmail(email);
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
}