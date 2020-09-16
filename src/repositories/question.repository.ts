import { EntityRepository, Repository } from "typeorm";
import Question from '@models/question';

@EntityRepository(Question)
export default class QuesionRepository extends Repository<Question> {

  public getQuestionsByVoteIdx = async (idx: number): Promise<Question[]> => {
    return this.createQueryBuilder()
      .where('fk_vote_idx = :idx', { idx })
      .getMany();
  }
}