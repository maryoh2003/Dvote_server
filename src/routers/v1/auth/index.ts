import { Service } from "typedi";
import ICustomRouter from "@interface/ICustomRouter";
import { Router } from "express";
import AuthController from "@controller/auth.controller";
import auth from '@middleware/auth.middleware';

@Service()
export default class AuthRouter implements ICustomRouter {

  private router = Router();

  constructor(
    private authController: AuthController,
  ) {
    this.router.post('/register', this.authController.register);
    this.router.post('/login', this.authController.login);
    this.router.post('/allow', auth('admin'), this.authController.allowMember);
    this.router.post('/deny', auth('admin'), this.authController.denyMember);
  }

  public getRouter = (): Router => this.router;
}