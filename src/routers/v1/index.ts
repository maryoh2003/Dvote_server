import { Router } from 'express';
import { Service } from 'typedi';
import ICustomRouter from '@interface/ICustomRouter';
import AuthRouter from './auth';
import VoteRouter from './vote';
import TargetRouter from './taget';

@Service()
export default class V3Router implements ICustomRouter {
  private router = Router();

  constructor(
    private readonly authRouter: AuthRouter,
    private readonly voteRouter: VoteRouter,
    private readonly targetRouter: TargetRouter,
  ) {
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/vote', this.voteRouter.getRouter());
    this.router.use('/target', this.targetRouter.getRouter());
  }

  public getRouter = (): Router => this.router;
}
