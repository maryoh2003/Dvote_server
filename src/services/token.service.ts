import jwt from 'jsonwebtoken';
import { JWT } from '@config/index';
import { SignOptions } from 'jsonwebtoken';
import CustomError from '@lib/errors/customError';
import { Service } from 'typedi';

@Service()
export default class TokenService {

  /**
   * @description 회원 id를 통한 jwt 생성
   * @param id 회원 아이디
   */
  public generateToken = async (id: string): Promise<string> => {
    const payload = {
      id,
    };

    const options: SignOptions = {
      expiresIn: JWT.EXPIRES_IN,
      issuer: 'dodam.com',
      subject: 'token',
    };

    return jwt.sign(payload, JWT.SECRET, options);
  }

  /**
   * @description 토큰을 검증 후 결과 반환
   * @param token 검증할 토큰
   */
  public verifyToken = async (token: string): Promise<object | string> => {
    return jwt.verify(token, JWT.SECRET);
  }

  public searchTokenError = (error: Error): CustomError | Error => {
    let code = null;
    let message = null;

    if (error instanceof CustomError) {
      return error;
    }

    switch (error.message) {
      case 'jwt must be provided':
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        code = 401;
        message = '위조된 토큰';
        break;
      case 'jwt expired':
        code = 410;
        message = '만료된 토큰';
        break;
      default:
        return error;
    }

    return new CustomError({ code, message });
  }
}
