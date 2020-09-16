import OptionChoiceRepository from "@repository/optionChoice";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import OptionChoiceRequest from '@lib/request/optionChoice/optionChoice.req';
import OptionService from "./option.service";
import StudentService from './student.service';

@Service()
export default class OptionChoiceService {

  constructor(
    @InjectRepository()
    private readonly optionChoiceRepository: OptionChoiceRepository,
    private readonly optionService: OptionService,
    private readonly studentService: StudentService,
  ) { }

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