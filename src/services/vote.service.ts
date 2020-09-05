import { Service } from "typedi";
import VoteRepository from '@repository/vote.repository';

@Service()
export default class VoteService {

  constructor(
    private readonly voteRepository: VoteRepository,
  ) { }
}