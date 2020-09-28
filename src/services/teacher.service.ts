import { Service } from "typedi";
import TeacherRepository from '@repository/teacher.repository';
import Teacher from '@models/teacher';
import MemberService from "./member.service";
import CustomError from "@lib/errors/customError";
import errors from '@lib/errors';
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export default class TeacherService {

  constructor(
    @InjectRepository()
    private readonly teacherRepository: TeacherRepository,
    private readonly memberService: MemberService,
  ) { }

  public getAcceptedTeachers = async (): Promise<Teacher[]> => {
    const teachers = await this.teacherRepository.getAcceptedTeachers();
    return teachers;
  }

  public getTeacherByIdx = async (idx: number): Promise<Teacher | null> => {
    const teacher = await this.teacherRepository.findOne(idx);

    if (teacher === undefined) {
      return null;
    }

    return teacher;
  }

  public getTeacher = async (email: string): Promise<Teacher | null> => {
    const member = await this.memberService.getMember(email);

    if (member === null) {
      throw new CustomError(errors.NoMember);
    }

    const teacher = await this.teacherRepository.getTeacherByMember(member);
    if (teacher === undefined) {
      return null;
    }

    return teacher;
  }
}