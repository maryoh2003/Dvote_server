import { Service } from "typedi";
import VoteRequest from '@lib/request/vote/vote.req';
import errors from '@lib/errors';
import CustomError from '@lib/errors/customError';
import VoteService from "@service/vote.service";
import { Request, Response, NextFunction } from 'express';
import AuthRequest from "types/AuthRequest";
import getNumberParam from "@lib/util/getNumberParam";
import Vote from '@models/vote';


@Service()
export default class VoteController {

  constructor(
    private readonly voteService: VoteService,
  ) { }

  /**
   * @description 설문 전체 조회
   */
  public getVotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const votes: Vote[] = await this.voteService.getVotes();

      res.status(200).json({
        message: '설문 전체 조회 성공',
        data: {
          votes,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 설문 타겟별 조회
   */
  public getVotesByTarget = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const target = getNumberParam(req.params.target);
      const votes: Vote[] = await this.voteService.getVotesByTarget(target);

      res.status(200).json({
        message: '설문 타겟별 조회 성공',
        data: {
          votes,
        },
      });
    } catch (err) {
      next(err);
    }
  }

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
  public modifyVote = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params.idx);
      const { body, member } = req;
      const data = new VoteRequest(body);

      if (!await data.validate()) {
        throw new CustomError(errors.WrongRequest);
      }

      await this.voteService.modifyVote(member.email, idx, data);

      res.status(200).json({
        message: '설문 수정 성공',
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @description 설문 삭제
   */
  public deleteVote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idx = getNumberParam(req.params.idx);
      const vote = this.voteService.getVoteByIdx(idx);

      if (vote === null) {
        throw new CustomError(errors.NoVote);
      }

      await this.voteService.deleteVote(idx);

      res.status(200).json({
        message: '설문 삭제 성공',
      });
    } catch (err) {
      next(err);
    }
  }
}