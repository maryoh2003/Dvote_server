import Vote from '@models/vote';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Vote)
export default class VoteRepository extends Repository<Vote> {

}