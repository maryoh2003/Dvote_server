import Teacher from '@models/teacher';
import { EntityRepository, Repository, TransactionManager, EntityManager } from 'typeorm';

@EntityRepository(Teacher)
export default class TeacherRepository extends Repository<Teacher> {

  /**
   * @description 선생님 추가
   */
  public async addTeacher(@TransactionManager() manager: EntityManager, teacher: Teacher): Promise<Teacher> {
    return manager.save<Teacher>(teacher);
  }

  /**
   * @description 승인된 선생님 전체 조회
   */
  public getAcceptedTeachers = async (): Promise<Teacher[]> => {
    return this.createQueryBuilder()
      .leftJoinAndSelect('teacher.member', 'teacher')
      .where('is_allowed = true')
      .orderBy('email', 'ASC')
      .getMany();
  }
}