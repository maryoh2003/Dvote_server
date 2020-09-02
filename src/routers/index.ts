import { Router } from 'express';
import { Service } from 'typedi';
import ICustomRouter from '@interface/ICustomRouter';
import V1Router from './v1';


@Service()
export default class APIRouter implements ICustomRouter {
  private router = Router();

  constructor(
    private v1Router: V1Router,
  ) {
    this.router.use('/v1', this.v1Router.getRouter());
  }

  public getRouter = (): Router => this.router;
}
