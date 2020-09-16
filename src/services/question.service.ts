import modelMapper from '@lib/util/modelMapper';
import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';
import VoteService from '@service/vote.service';
import { Service } from "typedi";
import QuestionRepository from '@repository/question.repository';
import Question from '@models/question';
import QuestionRequest from "@lib/request/question/question.req";
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export default class QuestionService {

  constructor(
    @InjectRepository()
    private readonly questionRepository: QuestionRepository,
    private readonly voteService: VoteService,
  ) { }

  /**
   * @description 설문 idx로 항목들 전체 조회
   */
  public getQuestionsByVoteIdx = async (idx: number): Promise<Question[]> => {
    const questions = await this.questionRepository.getQuestionsByVoteIdx(idx);
    const vote = await this.voteService.getVoteByIdx(idx);
    if (vote === null) {
      throw new CustomError(errors.NoVote);
    }

    return questions;
  }

  /**
   * @description idx로 항목 조회
   */
  public getQuestion = async (idx: number): Promise<Question> => {
    const question = await this.questionRepository.findOne(idx);

    if (question === undefined) {
      return null;
    }

    return question;
  }

  /**
   * @description 항목 생성
   */
  public createQuestion = async (data: QuestionRequest): Promise<void> => {
    const question = await this.questionRepository.create(data);
    const vote = await this.voteService.getVoteByIdx(data.voteIdx);

    question.vote = vote;

    await this.questionRepository.save(question);
  }

  /**
   * @description 항목 수정
   */
  public modfiyQuestion = async (idx: number, data: QuestionRequest): Promise<void> => {
    const question = await this.getQuestion(idx);

    if (question === null) {
      throw new CustomError(errors.NoQuestion);
    }
    const vote = await this.voteService.getVoteByIdx(data.voteIdx);

    modelMapper(data, question);
    question.vote = vote;

    await this.questionRepository.save(question);
  }

  /**
   * @description 항목 삭제
   */
  public deleteQuestion = async (idx: number): Promise<void> => {
    const question = await this.getQuestion(idx);

    if (question === null) {
      throw new CustomError(errors.NoQuestion);
    }
    await this.questionRepository.remove(question);
  }
}