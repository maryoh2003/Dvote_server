import { Response, NextFunction } from 'express';
import errorMiddleware from './error.middleware';
import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';
import { AccountType } from '@lib/enum/user';
import Container from 'typedi';
import TokenService from '@service/token.service';
import { isArray } from 'util';
import UserService from '@service/user.service';
import TeacherService from '@service/teacher.service';
import AdminService from '@service/admin.service';
import UserPermissionService from '@service/userPermission.service';

type StrAccessLevelType =
  'student'
  | 'teacher'
  | 'parent'
  | 'guest'
  | 'admin';

/**
 * @description 인증 미들웨어
 */
export default (strAccessLevel?: StrAccessLevelType[] | StrAccessLevelType, permission?: string) =>
  async (req: any, res: Response, next: NextFunction) => {

    const tokenService = Container.get(TokenService);
    const userPermissionService = Container.get(UserPermissionService);
    const userService = Container.get(UserService);

    const token: string | string[] = req.headers['x-access-token'];

    if (Array.isArray(token)) {
      throw new CustomError(errors.WrongRequest);
    }

    try {
      const decoded = Object(await tokenService.verifyToken(token));

      const { id }: { id: string } = decoded;
      const user = await userService.getUser(id);
      if (user === null) {
        throw new CustomError(errors.NoUser);
      }

      req.user = user;

      // 권한이 필요 없는 경우
      if (strAccessLevel === undefined) {
        return next();
      }


      // 할당된 권한이 필요한 경우
      if (permission !== undefined) {
        const hasUserPermission = await userPermissionService.
          hasPermission(user.id, permission);

        // 필요한 권한을 할당받은 경우
        if (hasUserPermission === true) {
          return next();
        }
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
        const adminService = Container.get(AdminService);

        const teacher = await teacherService.getTeacher(user.id);
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
      const accessLevels: AccountType[] = [];

      for (const strAccessLevelItem of strAccessLevels) {
        switch (strAccessLevelItem) {
          case 'student':
            accessLevels.push(AccountType.STUDENT);
            break;

          case 'teacher':
            accessLevels.push(AccountType.TEACHER);
            break;

          case 'parent':
            accessLevels.push(AccountType.PARENT);
            break;

          case 'guest':
            accessLevels.push(AccountType.GUEST);
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

      if (accessLevels.includes(user.accountType) === true) {
        return next();
      }

      throw new CustomError(errors.Forbidden);
    } catch (err) {
      const error = tokenService.searchTokenError(err);
      errorMiddleware(error, req, res, next);
    }
  };
