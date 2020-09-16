import OptionController from "@controller/option.controller";
import ICustomRouter from "@interface/ICustomRouter";
import { Router } from "express";
import { Service } from "typedi";

@Service()
export default class OptionRouter implements ICustomRouter {

  private router = Router();

  constructor(
    private optionController: OptionController,
  ) {
    this.router.get('/:idx', this.optionController.getOptionsByQuestionIdx);
    this.router.post('/', this.optionController.createOption);
    this.router.put('/:idx', this.optionController.modifyOption);
    this.router.delete('/:idx', this.optionController.deleteOption);
  }

  public getRouter = (): Router => this.router;
}