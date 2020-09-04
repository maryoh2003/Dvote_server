import Teacher from '@models/teacher';
import { EntityRepository, Repository, TransactionManager, EntityManager } from 'typeorm';

@EntityRepository(Teacher)
export default class TeacherRepository extends Repository<Teacher> {

  public async addTeacher(@TransactionManager() manager: EntityManager, teacher: Teacher): Promise<Teacher> {
    return manager.save<Teacher>(teacher);
  }
}