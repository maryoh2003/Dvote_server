import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import generateUUID from '@lib/util/generateUUID';
import path from 'path';
import errorMiddleware from './error.middleware';
import CustomError from '@lib/errors/customError';


/**
 * 파일 관련 오류
 */
const INVALID_FILE_TYPE_ERR = 'Invalid file type';
const UNEXPECTED_FIELD_ERR = 'Unexpected field';
const FILE_TOO_LARGE_ERR = 'File too large';

// 업로드 가능 파일 타입
const allowFileType = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
];

// FIXME: 파일 이름이 한글일 경우 접근 안되는 오류
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (allowFileType.indexOf(file.mimetype) !== -1) {
      cb(null, true);
    } else {
      cb(new Error(INVALID_FILE_TYPE_ERR));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  storage: multer.diskStorage({
    destination: (_req, file, cb) => {
      cb(null, path.join(__dirname, `../../public/`));
    },
    filename: (_req, file, cb) => {
      cb(null, `${generateUUID()}_${encodeURI(file.originalname)}`);
    },
  })
}).array('files');

export default (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, err => {
    if (err) {
      let customError: CustomError = err;

      switch (err.message) {
        case INVALID_FILE_TYPE_ERR:
          customError = new CustomError({
            code: 400,
            message: '옳지 않음 파일 타입',
          });
          break;

        case UNEXPECTED_FIELD_ERR:
          customError = new CustomError({
            code: 400,
            message: '옳지 않은 필드',
          });
          break;

        case FILE_TOO_LARGE_ERR:
          customError = new CustomError({
            code: 413,
            message: '파일 크기 초과',
          });
        // no deafult
      }

      errorMiddleware(customError, req, res, next);
    } else {
      next();
    }
  });
};
