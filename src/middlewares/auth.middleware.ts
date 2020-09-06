import { Response, NextFunction } from 'express';
import errorMiddleware from './error.middleware';
import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';
import { MemberType } from '@lib/enum/member';
import Container from 'typedi';
import TokenService from '@service/token.service';
import { isArray } from 'util';
import MemberService from '@service/member.service';
import TeacherService from '@service/teacher.service';
import AdminSerivce from '@service/admin.service';

type StrAccessLevelType =
  'student'
  | 'teacher'
  | 'guest'
  | 'admin';

/**
 * @description 인증 미들웨어
 */
export default (strAccessLevel?: StrAccessLevelType[] | StrAccessLevelType) =>
  async (req: any, res: Response, next: NextFunction) => {

    const tokenService = Container.get(TokenService);
    const memberService = Container.get(MemberService);

    const token: string | string[] = req.headers['x-access-token'];

    if (Array.isArray(token)) {
      throw new CustomError(errors.WrongRequest);
    }

    try {
      const decoded = Object(await tokenService.verifyToken(token));

      const { email }: { email: string } = decoded;
      const member = await memberService.getMember(email);
      if (member === null) {
        throw new CustomError(errors.NoMember);
      }

      req.member = member;

      // 권한이 필요 없는 경우
      if (strAccessLevel === undefined) {
        return next();
      }

      let strAccessLevels: string[] = [];
      if (strAccessLevel instanceof Array) {
        strAccessLevels = strAccessLevel;
      } else {
        strAccessLevels = [strAccessLevel];
      }

      /**
       * 관리자를 포함한 권한 설정
       * 직접 할당된 권한을 제외한 계정타입을 통한 권한 할당 불가능
       */
      if (strAccessLevels.includes('admin') === true) {
        const teacherService = Container.get(TeacherService);
        const adminService = Container.get(AdminSerivce);

        const teacher = await teacherService.getTeacher(member.email);
        if (teacher === null) {
          throw new CustomError(errors.Forbidden);
        }

        const admin = await adminService.getAdmin(teacher.idx);
        if (admin === null) {
          throw new CustomError(errors.Forbidden);
        }

        return next();
      }

      // strAccessLevle을 accountType으로 변경
      const accessLevels: MemberType[] = [];

      for (const strAccessLevelItem of strAccessLevels) {
        switch (strAccessLevelItem) {
          case 'student':
            accessLevels.push(MemberType.STUDENT);
            break;

          case 'teacher':
            accessLevels.push(MemberType.TEACHER);
            break;

          case 'guest':
            accessLevels.push(MemberType.GUEST);
            break;

          case 'admin':
            break;

          default:
            throw new CustomError({
              code: 500,
              message: '옳지 않은 할당 권한 입니다',
            });
        }
      }

      if (accessLevels.includes(member.memberType) === true) {
        return next();
      }

      throw new CustomError(errors.Forbidden);
    } catch (err) {
      const error = tokenService.searchTokenError(err);
      errorMiddleware(error, req, res, next);
    }
  };
