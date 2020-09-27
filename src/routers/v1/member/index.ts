import ICustomRouter from "@interface/ICustomRouter";
import { Service } from "typedi";
import { Router } from "express";
import MemberController from '@controller/member.controller';

@Service()
export default class MemberRouter implements ICustomRouter {

  private router = Router();

  constructor(
    private memberController: MemberController,
  ) {
    this.router.get('/', this.memberController.getAcceptedMembers);
    this.router.get('/waiting', this.memberController.getWaitingMembers);
  }

  public getRouter = (): Router => this.router;
}