import IError from '@interface/IError';

export default class CustomError {
  constructor(err: IError) {
    this.code = err.code;
    this.message = err.message;
  }

  code: number;
  message: string;
}