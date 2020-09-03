import { Service } from "typedi";
import MemberService from '@service/member.service';
import TokenService from "@service/token.service";
import { Request, Response, NextFunction } from "express";
import MemberRequest from "@lib/request/auth/member.req";
import { MemberType } from "@lib/enum/member";
import StudentRequest from "@lib/request/auth/student.req";
import errors from '@lib/errors';
import CustomError from "@lib/errors/customError";
import TeacherRequest from "@lib/request/auth/teacher.req";
import LoginRequest from '@lib/request/auth/login.req';

@Service()
export default class AuthController {
  constructor(
    private readonly memberService: MemberService,
    private readonly tokenService: TokenService,
  ) { }

  /**
   * @description 회원가입 (학생, 교사)
   */
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const data = new MemberRequest(body);
      let registerData;

      if (data.memberType === MemberType.STUDENT) {
        registerData = new StudentRequest(body);
        if (!await registerData.validate()) {
          throw new CustomError(errors.WrongRequest);
        }

        if (this.memberService.isExist(registerData.email)) {
          throw new CustomError({
            code: 409,
            message: '이미 존재하는 회원',
          });
        }

        await this.memberService.registerStudent(registerData);
      } else if (data.memberType === MemberType.TEACHER) {
        registerData = new TeacherRequest(body);
        if (!await registerData.validate()) {
          throw new CustomError(errors.WrongRequest);
        }

        if (this.memberService.isExist(registerData.email)) {
          throw new CustomError({
            code: 409,
            message: '이미 존재하는 회원',
          });
        }

        await this.memberService.registerTeacher(registerData);
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 로그인
   */
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req.body;

      const data = new LoginRequest(body);
      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      const member = await this.memberService.login(data);

      const token = await this.tokenService.generateToken(member.email);

      res.status(200).json({
        message: '로그인 성공',
        data: {
          'x-access-token': token,
          member,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 회원 승인
   */
  public allowMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email }: { email: string } = req.body;
      if (!email) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.memberService.allowMember(email);

      res.status(200).json({
        message: '회원 승인 성공',
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 회원 거절
   */
  public denyMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email }: { email: string } = req.body;
      if (!email) {
        throw new CustomError(errors.WrongRequest)
      }

      await this.memberService.denyMember(email);
    } catch (err) {
      next(err);
    }
  }
}