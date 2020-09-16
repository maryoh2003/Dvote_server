import OptionChoiceController from "@controller/optionChoice.controller";
import ICustomRouter from "@interface/ICustomRouter";
import { Router } from "express";
import { Service } from "typedi";
import auth from '@middleware/auth.middleware';

@Service()
export default class OptionChoiceRouter implements ICustomRouter {

  private router = Router();

  constructor(
    private optionChoiceController: OptionChoiceController,
  ) {
    this.router.post('/', auth('student'), this.optionChoiceController.createOptionChoice);
  }

  public getRouter = (): Router => this.router;
}