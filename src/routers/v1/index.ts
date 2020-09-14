import { Router } from 'express';
import { Service } from 'typedi';
import ICustomRouter from '@interface/ICustomRouter';
import AuthRouter from './auth';
import VoteRouter from './vote';

@Service()
export default class V3Router implements ICustomRouter {
  private router = Router();

  constructor(
    private readonly authRouter: AuthRouter,
    private readonly voteRouter: VoteRouter,
  ) {
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/vote', this.voteRouter.getRouter());
  }

  public getRouter = (): Router => this.router;
}
