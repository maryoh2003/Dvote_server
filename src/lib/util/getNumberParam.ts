import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';

export default (convertNum: any) => {
  const num = Number(convertNum);

  if (isNaN(num)) {
    throw new CustomError(errors.WrongRequest);
  }

  return num;
};