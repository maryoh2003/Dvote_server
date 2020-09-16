import TargetController from "@controller/target.controller";
import ICustomRouter from "@interface/ICustomRouter";
import { Router } from "express";
import { Service } from "typedi";

@Service()
export default class TargetRouter implements ICustomRouter {

  private router = Router();

  constructor(
    private targetController: TargetController,
  ) {
    this.router.get('/', this.targetController.getTargets);
  }

  public getRouter = (): Router => this.router;
}