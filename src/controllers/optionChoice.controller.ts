import OptionChoiceRequest from '@lib/request/optionChoice/optionChoice.req';
import { Request, Response, NextFunction } from 'express';
import OptionChoiceService from "@service/optionChoice.service";
import { Service } from "typedi";
import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';
import AuthRequest from 'types/AuthRequest';

@Service()
export default class OptionChoiceController {

  constructor(
    private readonly optionChoiceService: OptionChoiceService,
  ) { }

  /**
   * @description 보기 선택 생성
   */
  public createOptionChoice = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { body, member } = req;
      const data = new OptionChoiceRequest(body);

      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.optionChoiceService.createOptionChoice(member.email, data);

      res.status(200).json({
        message: '보기 선택 생성 성공',
      });
    } catch (err) {
      next(err);
    }
  }
}