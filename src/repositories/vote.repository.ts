import Vote from '@models/vote';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Vote)
export default class VoteRepository extends Repository<Vote> {

  public getVoteByIdx = async (idx: number): Promise<Vote | undefined> => {
    return this.createQueryBuilder()
      .where('idx = :idx', { idx })
      .getOne();
  }

  public getVotes = async (): Promise<Vote[]> => {
    return this.createQueryBuilder()
      .orderBy('created_at', 'DESC')
      .getMany();
  }

  public getVotesByTarget = async (target: number): Promise<Vote[]> => {
    return this.createQueryBuilder()
      .where('fk_target_group_idx = :target', { target })
      .orderBy('created_at', 'DESC')
      .getMany();
  }
}