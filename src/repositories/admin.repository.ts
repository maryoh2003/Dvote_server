import Admin from '@models/admin';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Admin)
export default class AdminRepository extends Repository<Admin> {
}