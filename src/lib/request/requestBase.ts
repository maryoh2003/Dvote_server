import { ValidationError, validate } from 'class-validator';
import * as logger from '@lib/logger';

export default class RequestBase {
  constructor(data: object) {
    Object.keys(data).forEach((e) => {
      this[e] = data[e];
    });
  }

  public async validate(): Promise<boolean> {

    const validateErrors: ValidationError[] = await validate(this);
    if (validateErrors.length === 0) return true;

    logger.debug(validateErrors);

    return false;
  }
}
