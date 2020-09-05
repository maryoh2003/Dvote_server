import { Service } from "typedi";
import VoteService from "@service/vote.service";

@Service()
export default class VoteController {

  constructor(
    private readonly voteService: VoteService,
  ) { }
}