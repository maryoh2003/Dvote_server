import QuestionController from "@controller/question.controller";
import ICustomRouter from "@interface/ICustomRouter";
import { Router } from "express";
import { Service } from "typedi";

@Service()
export default class QuestionRouter implements ICustomRouter {

  private router = Router();

  constructor(
    private questionController: QuestionController,
  ) {
    this.router.post('/', this.questionController.createQuestion);
    this.router.get('/:idx', this.questionController.getQuestionsByVoteIdx);
    this.router.put('/:idx', this.questionController.modifyQuestion);
    this.router.delete('/:idx', this.questionController.deleteQuestion);
  }

  public getRouter = (): Router => this.router;
}