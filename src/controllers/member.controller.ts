import { Request, Response, NextFunction } from 'express';
import { Service } from "typedi";
import MemberService from "@service/member.service";
import StudentService from '@service/student.service'
import TeacherService from '@service/teacher.service';
import { runInNewContext } from 'vm';

@Service()
export default class MemberController {

  constructor(
    private readonly studentService: StudentService,
    private readonly memberService: MemberService,
    private readonly teacherService: TeacherService,
  ) { }

  /**
   * @description 승인 대기 중인 회원 조회
   */
  public getWaitingMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const members = await this.memberService.getWaitingMembers();

      res.status(200).json({
        message: '승인 대기 중인 회원 조회 성공',
        data: {
          members,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 승인된 회원 전체 조회
   */
  public getAcceptedMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teachers = await this.teacherService.getAcceptedTeachers();
      const students = await this.studentService.getAcceptedStudents();

      res.status(200).json({
        message: '승인된 회원 전체 조회 성공',
        data: {
          teachers,
          students,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}