import Teacher from '@models/teacher';
import { EntityRepository, Repository, TransactionManager, EntityManager } from 'typeorm';
import Member from '@models/member';

@EntityRepository(Teacher)
export default class TeacherRepository extends Repository<Teacher> {

  /**
   * @description 선생님 추가
   * @param manager 트랜젝션 manager
   * @param member 선생님 객체
   */
  public async addTeacher(@TransactionManager() manager: EntityManager, teacher: Teacher): Promise<Teacher> {
    return manager.save<Teacher>(teacher);
  }

  /**
   * @description 승인된 선생님 전체 조회
   */
  public getAcceptedTeachers = async (): Promise<Teacher[]> => {
    return this.createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.member', 'member')
      .where('member.is_allowed = true')
      .orderBy('member.email', 'ASC')
      .getMany();
  }

  public getTeacherByMember = async (member: Member): Promise<Teacher | undefined> => {
    return this.createQueryBuilder()
      .where('fk_member_email = :member', { member: member.email })
      .getOne();
  }
}