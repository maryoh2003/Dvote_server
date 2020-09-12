import { Service } from "typedi";
import VoteRequest from '@lib/request/vote/vote.req';
import errors from '@lib/errors';
import CustomError from '@lib/errors/customError';
import VoteService from "@service/vote.service";
import { Request, Response, NextFunction } from 'express';
import AuthRequest from "types/AuthRequest";
import getNumberParam from "@lib/util/getNumberParam";


@Service()
export default class VoteController {

  constructor(
    private readonly voteService: VoteService,
  ) { }

  /**
   * @description 설문 생성
   */
  public createVote = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { body, member } = req;
      const data = new VoteRequest(body);

      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.voteService.createVote(member.email, data);

      res.status(200).json({
        message: '설문 생성 성공',
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 설문 수정
   */
  public modifyVote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params);
      const { body } = req;
      const data = new VoteRequest(body);

      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.voteService.modifyVote(idx, data);

      res.status(200).json({
        message: '설문 수정 성공',
      });
    } catch (err) {
      next(err);
    }
  }
}