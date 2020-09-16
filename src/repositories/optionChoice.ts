import OptionChoice from '@models/option_choice';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(OptionChoice)
export default class OptionChoiceRepository extends Repository<OptionChoice> {

}