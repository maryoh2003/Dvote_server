import OptionChoice from '@models/option_choice';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(OptionChoice)
export default class OptionChoiceRepository extends Repository<OptionChoice> {

  public getOptionChoicesByOptionIdx = async (idx: number): Promise<OptionChoice[]> => {
    return this.createQueryBuilder()
      .where('fk_option_idx = :idx', { idx })
      .getMany();
  }

  public getOptionChoicesByStudentIdx = async (idx: number): Promise<OptionChoice[]> => {
    return this.createQueryBuilder()
      .where('fk_student_idx = :idx', { idx })
      .getMany();
  }
}
