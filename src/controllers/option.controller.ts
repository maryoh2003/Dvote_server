import { Request, Response, NextFunction, Router } from 'express';
import OptionService from "@service/option.service";
import { Service } from "typedi";
import getNumberParam from '@lib/util/getNumberParam';
import Option from '@models/option';
import OptionRequest from '@lib/request/option/option.req';
import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';

@Service()
export default class OptionController {

  constructor(
    private readonly optionService: OptionService,
  ) { }

  /**
   * @description 항목 idx로 보기 전체 조회
   */
  public getOptionsByQuestionIdx = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params.idx);
      const options: Option[] = await this.optionService.getOptionsByQuestionIdx(idx);

      res.status(200).json({
        message: '보기 전체 조회 성공',
        data: {
          options,
        }
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 보기 생성
   */
  public createOption = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const data = new OptionRequest(body);

      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.optionService.createOption(data);

      res.status(200).json({
        message: '보기 생성 성공',
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 보기 수정
   */
  public modifyOption = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params.idx);
      const { body } = req;
      const data = new OptionRequest(body);

      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.optionService.modifyOption(idx, data);

      res.status(200).json({
        message: '보기 수정 성공',
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 보기 삭제
   */
  public deleteOption = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params.idx);
      const option = await this.optionService.getOption(idx);

      if (option === null) {
        throw new CustomError(errors.NoOption);
      }

      await this.optionService.deleteOption(idx);

      res.status(200).json({
        message: '보기 삭제 성공',
      });
    } catch (err) {
      next(err);
    }
  }
}