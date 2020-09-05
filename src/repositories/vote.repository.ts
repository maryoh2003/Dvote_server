import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Vote)
export default class Vote extends Repository<Vote> {


}