import { Request, Response, NextFunction } from 'express';
import TargetService from "@service/target.service";
import { Service } from "typedi";
import Target from '@models/target';

@Service()
export default class TargetController {

  constructor(
    private readonly targetService: TargetService,
  ) { }

  /**
   * @description 타겟 전체 조회
   */
  public getTargets = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const targets: Target[] = await this.targetService.getTargets();

      res.status(200).json({
        message: '타겟 전체 조회 성공',
        data: {
          targets,
        }
      });
    } catch (err) {
      next(err);
    }
  }
}