import { Router } from 'express';
import { Service } from 'typedi';
import ICustomRouter from '@interface/ICustomRouter';
import AuthRouter from './auth';
import VoteRouter from './vote';
import TargetRouter from './taget';
import QuestionRouter from './question';
import OptionRouter from './option';
import OptionChoiceRouter from './optionChoice';
import MemberRouter from './member';

@Service()
export default class V3Router implements ICustomRouter {
  private router = Router();

  constructor(
    private readonly authRouter: AuthRouter,
    private readonly voteRouter: VoteRouter,
    private readonly targetRouter: TargetRouter,
    private readonly questionRouter: QuestionRouter,
    private readonly optionRouter: OptionRouter,
    private readonly optionChoiceRouter: OptionChoiceRouter,
    private readonly memberRouter: MemberRouter,
  ) {
    this.router.use('/auth', this.authRouter.getRouter());
    this.router.use('/vote', this.voteRouter.getRouter());
    this.router.use('/target', this.targetRouter.getRouter());
    this.router.use('/question', this.questionRouter.getRouter());
    this.router.use('/option', this.optionRouter.getRouter());
    this.router.use('/choice', this.optionChoiceRouter.getRouter());
    this.router.use('member', this.memberRouter.getRouter());
  }

  public getRouter = (): Router => this.router;
}
