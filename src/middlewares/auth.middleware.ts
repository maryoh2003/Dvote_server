import errorMiddleware from '@middleware/error.middleware';
import CustomError from '@lib/errors/customError';
import MemberService from '@service/member.service';
import TokenService from '@service/token.service';
import TeacherService from '@service/teacher.service';
import StudentService from '@service/student.service';
import AdminService from '@service/admin.service';
import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import errors from '@lib/errors';

export default (accessLevel: string) =>
  async (req: any, res: Response, next: NextFunction) => {

    const tokenService = Container.get(TokenService);
    const memberService = Container.get(MemberService);
    const teacherService = Container.get(TeacherService);
    const studentService = Container.get(StudentService);
    const adminService = Container.get(AdminService);

    const token = req.headers['x-access-token'];

    try {

      const decoded = Object(await tokenService.verifyToken(token));
      const { id }: { id: string } = decoded;
      const member = await memberService.getMember(id);

      if (member === null) {
        throw new CustomError(errors.NoMember);
      }

      req.member = member;

      switch (accessLevel) {
        case 'student':
          const student = await studentService.getStudentByEmail(member.email);
          if (student === null) {
            throw new CustomError(errors.Forbidden);
          }
          return next();
        case 'teacher':
          const teacher = await teacherService.getTeacher(id);
          if (teacher === null) {
            throw new CustomError(errors.Forbidden);
          }
          return next();
        case 'admin':
          const admin = await adminService.getAdmin(id);
          if (admin === null) {
            throw new CustomError(errors.Forbidden);
          }
          return next();
        default:
          throw new CustomError({
            code: 500,
            message: '옳지 않은 권한',
          })
      }
    } catch (err) {
      const error = tokenService.searchTokenError(err);
      errorMiddleware(error, req, res, next);
    }
  }