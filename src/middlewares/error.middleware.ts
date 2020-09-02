import { Request, Response, NextFunction } from 'express';
import CustomError from '@src/lib/errors/customError';
import * as logger from '@lib/logger';

/**
 * @description 에러 핸들링 미들웨어
 * @param err errors의 error
 */
export default (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
  let customError;
  if (!(err instanceof CustomError)) {
    // TODO: 오류 전송
    logger.serverError(`[${req.method}] ${req.path}`, err);

    customError = new CustomError({
      code: 500,
      message: '서버 오류',
    });
  } else {
    logger.clientError(`[${req.method}] ${req.path}`, err);
    customError = err;
  }

  res.status(customError.code).json({
    message: customError.message,
  });
};
