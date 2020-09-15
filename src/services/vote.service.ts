import Target from '@models/target';
import modelMapper from '@lib/util/modelMapper';
import CustomError from '@lib/errors/customError';
import { Service } from "typedi";
import MemberService from './member.service';
import VoteRepository from '@repository/vote.repository';
import VoteRequest from "@lib/request/vote/vote.req";
import Vote from "@models/vote";
import TeacherService from "./teacher.service";
import errors from '@lib/errors';
import { InjectRepository } from 'typeorm-typedi-extensions';
import TargetService from './target.service';

@Service()
export default class VoteService {

  constructor(
    @InjectRepository()
    private readonly voteRepository: VoteRepository,
    private readonly teacherService: TeacherService,
    private readonly targetService: TargetService
    // TODO: 타켓 서비스 만들어서 inject
  ) { }

  public getVotes = async (): Promise<Vote[]> => {
    const votes: Vote[] = await this.voteRepository.getVotes();

    return votes;
  }

  public getVotesByTarget = async (target: number): Promise<Vote[]> => {
    const votes: Vote[] = await this.voteRepository.getVotesByTarget(target);

    return votes;
  }

  public getVoteByIdx = async (idx: number): Promise<Vote | null> => {
    const vote = await this.voteRepository.getVoteByIdx(idx);

    if (vote === undefined) {
      return null;
    }

    return vote;
  }

  public createVote = async (email: string, data: VoteRequest): Promise<void> => {
    const teacher = await this.teacherService.getTeacher(email);

    const vote = await this.voteRepository.create(data);
    const target: Target = await this.targetService.getTarget(data.targetIdx);
    vote.teacher = teacher;
    vote.target = target;

    await this.voteRepository.save(vote);
  }

  public modifyVote = async (idx: number, data: VoteRequest): Promise<void> => {
    console.log('service');
    const vote = await this.getVoteByIdx(idx);
    if (vote === null) {
      throw new CustomError(errors.NoVote);
    }
    modelMapper(data, vote);
    await this.voteRepository.save(vote);
  }

  public deleteVote = async (idx: number): Promise<void> => {
    const vote = await this.getVoteByIdx(idx);
    await this.voteRepository.remove(vote);
  }

}