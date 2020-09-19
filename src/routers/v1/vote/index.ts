import VoteController from "@controller/vote.controller";
import ICustomRouter from "@interface/ICustomRouter";
import auth from '@middleware/auth.middleware';
import { Router } from "express";
import { Service } from "typedi";

@Service()
export default class VoteRouter implements ICustomRouter {

  private router = Router();

  constructor(
    private voteController: VoteController,
  ) {
    this.router.get('/', this.voteController.getVotes);
    this.router.get('/:target', this.voteController.getVotesByTarget);
    this.router.get('/:idx', this.voteController.getVote);
    this.router.post('/', auth('teacher'), this.voteController.createVote);
    this.router.put('/:idx', auth('teacher'), this.voteController.modifyVote);
    this.router.delete('/:idx', auth('teacher'), this.voteController.deleteVote);
  }

  public getRouter = (): Router => this.router;
}