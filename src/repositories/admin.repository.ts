import Admin from '@models/admin';
import { EntityRepository, Repository } from "typeorm";
import Teacher from '@models/teacher';

@EntityRepository(Admin)
export default class AdminRepository extends Repository<Admin> {
  /**
   * @description 선생님 객체를 통한 어드민 조회
   */
  public getAdminByTeacher = async (teacher: Teacher): Promise<Admin | undefined> => {
    return this.createQueryBuilder()
      .where('fk_teacher_idx = :teacher', { teacher: teacher.idx })
      .getOne();
  }
}