import OptionChoiceRepository from "@repository/optionChoice";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import OptionChoiceRequest from '@lib/request/optionChoice/optionChoice.req';
import OptionService from "./option.service";
import StudentService from './student.service';
import CustomError from '@lib/errors/customError';
import errors from '@lib/errors';

@Service()
export default class OptionChoiceService {

  constructor(
    @InjectRepository()
    private readonly optionChoiceRepository: OptionChoiceRepository,
    private readonly optionService: OptionService,
    private readonly studentService: StudentService,
  ) { }

  /**
   * @description optionIdx를 통한 보기 선택 전체 조회
   */
  public getOptionChoicesByOptionIdx = async (idx: number) => {
    const choices = await this.optionChoiceRepository.getOptionChoicesByOptionIdx(idx);
    const option = await this.optionService.getOption(idx);

    if (option === null) {
      throw new CustomError(errors.NoOption);
    }

    return choices;
  }

  /**
   * @description studentIdx를 통한 보기 선택 전체 조회
   */
  public getOptionChoicesByStudentIdx = async (idx: number) => {
    const choices = await this.optionChoiceRepository.getOptionChoicesByStudentIdx(idx);

    return choices;
  }
  /**
   * @description 항목 선택 생성
   */
  public createOptionChoice = async (email: string, data: OptionChoiceRequest): Promise<void> => {
    const choice = await this.optionChoiceRepository.create(data);

    const option = await this.optionService.getOption(data.optionIdx);
    const student = await this.studentService.getStudentByEmail(email);

    choice.option = option;
    choice.student = student;

    await this.optionChoiceRepository.save(choice);
  }
}