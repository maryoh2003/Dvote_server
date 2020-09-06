import { Service } from "typedi";
import MemberService from './member.service';
import VoteRepository from '@repository/vote.repository';
import VoteRequest from "@lib/request/vote/vote.req";
import Vote from "@models/vote";
import modelMapper from '@lib/util/modelMapper';
import TeacherService from "./teacher.service";

@Service()
export default class VoteService {

  constructor(
    private readonly voteRepository: VoteRepository,
    private readonly teacherService: TeacherService,
  ) { }

  public createVote = async (memberEmail: string, data: VoteRequest): Promise<void> => {
    const member = await this.teacherService.getTeacher(memberEmail);

    const vote = this.voteRepository.create(data);
    vote.teacher = member;

    await this.voteRepository.save(vote);
  }
}