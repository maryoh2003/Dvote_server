import Student from '@models/student';
import { EntityRepository, Repository, TransactionManager, EntityManager } from "typeorm";

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student>{

  /**
   * @description 학생 추가(트랜젝션)
   * @param manager 트랜젝션 manager
   * @param member 학생 객체
   */
  public async addStudent(@TransactionManager() manager: EntityManager, student: Student): Promise<Student> {
    return manager.save<Student>(student);
  }

  /**
   * @description 승인된 학생 전체 조회
   */
  public getAcceptedStudents = async (): Promise<Student[]> => {
    return this.createQueryBuilder()
      .leftJoinAndSelect('student.member', 'student')
      .where('is_allowed = true')
      .orderBy('email', 'ASC')
      .getMany();
  }

  /**
   * @description email을 통한 학생 조회
   */
  public getStudentByEmail = async (email: string): Promise<Student> => {
    return this.createQueryBuilder()
      .where('fk_member_email = :email', { email })
      .getOne();
  }
}