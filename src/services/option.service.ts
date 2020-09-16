import modelMapper from '@lib/util/modelMapper';
import OptionRepository from "@repository/option.repository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import Option from '@models/option';
import QuestionService from "./question.service";
import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';
import OptionRequest from '@lib/request/option/option.req';

@Service()
export default class OptionService {

  constructor(
    @InjectRepository()
    private readonly optionRepository: OptionRepository,
    private readonly questionService: QuestionService,
  ) { }

  /**
   * @description 항목 idx로 보기 전체 조회
   */
  public getOptionsByQuestionIdx = async (idx: number): Promise<Option[]> => {
    const options = await this.optionRepository.getOptionsByQuestionIdx(idx);
    const question = await this.questionService.getQuestion(idx);

    if (question === null) {
      throw new CustomError(errors.NoQuestion);
    }

    return options;
  }

  /**
   * @description idx로 보기 조회
   */
  public getOption = async (idx: number): Promise<Option> => {
    const option = await this.optionRepository.findOne(idx);

    if (option === undefined) {
      return null;
    }

    return option;
  }

  /**
   * @description 보기 생성
   */
  public createOption = async (data: OptionRequest): Promise<void> => {
    const option = await this.optionRepository.create(data);
    const question = await this.questionService.getQuestion(data.questionIdx);

    option.question = question;

    await this.optionRepository.save(option);
  }

  /**
   * @descriptoin 보기 수정
   */
  public modifyOption = async (idx: number, data: OptionRequest): Promise<void> => {
    const option = await this.getOption(idx);

    if (option === null) {
      throw new CustomError(errors.NoOption);
    }
    const question = await this.questionService.getQuestion(data.questionIdx);

    modelMapper(data, option);
    option.question = question;

    await this.optionRepository.save(option);
  }

  /**
   * @description 보기 삭제
   */
  public deleteOption = async (idx: number): Promise<void> => {
    const option = await this.getOption(idx);

    if (option === null) {
      throw new CustomError(errors.NoOption);
    }
    await this.optionRepository.remove(option);
  }
}