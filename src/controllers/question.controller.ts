import getNumberParam from '@lib/util/getNumberParam';
import { Response, Request, NextFunction } from 'express';
import QuestionService from "@service/question.service";
import { Service } from "typedi";
import Question from '@models/question';
import QuestionRequest from '@lib/request/question/question.req';
import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';
import { ExclusionMetadata } from 'typeorm/metadata/ExclusionMetadata';

@Service()
export default class QuestionController {

  constructor(
    private readonly questionService: QuestionService,
  ) { }

  /**
   * @description 항목 전체 조회
   */
  public getQuestionsByVoteIdx = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params.idx);
      const questions: Question[] = await this.questionService.getQuestionsByVoteIdx(idx)

      res.status(200).json({
        message: '항목 전체 조회 성공',
        data: {
          questions,
        }
      })
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 항목 생성
   */
  public createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const data = new QuestionRequest(body);

      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.questionService.createQuestion(data);

      res.status(200).json({
        message: '항목 생성 성공',
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 항목 수정
   */
  public modifyQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params.idx);
      const { body } = req;
      const data = new QuestionRequest(body);

      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.questionService.modfiyQuestion(idx, data);

      res.status(200).json({
        message: '항목 수정 성공',
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 항목 삭제
   */
  public deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params.idx);
      const question = await this.questionService.getQuestion(idx);

      if (question === null) {
        throw new CustomError(errors.NoQuestion);
      }

      await this.questionService.deleteQuestion(idx);

      res.status(200).json({
        message: '항목 삭제 성공',
      });
    } catch (err) {
      next(err);
    }
  }
}