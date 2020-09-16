import { EntityRepository, Repository } from "typeorm";
import Option from '@models/option';

@EntityRepository(Option)
export default class OptionRepository extends Repository<Option> {

  public getOptionsByQuestionIdx = async (idx: number): Promise<Option[]> => {
    return this.createQueryBuilder()
      .where('fk_question_idx = :idx', { idx })
      .getMany();
  }
}
