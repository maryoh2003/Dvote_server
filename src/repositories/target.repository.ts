import { EntityRepository, Repository } from "typeorm";
import Target from '@models/target';

@EntityRepository(Target)
export default class TargetRepository extends Repository<Target> {

  public getTargetByIdx = (idx: number): Promise<Target> => {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();
  }
}