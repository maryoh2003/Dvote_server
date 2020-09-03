import Student from '@models/student';
import { EntityRepository, Repository, TransactionManager, EntityManager } from "typeorm";

@EntityRepository()
export default class StudentRepository extends Repository<Student>{

  /**
   * @description 학생 추가(트랜젝션)
   * @param manager 트랜젝션 manager
   * @param member 학생 객체
   */
  public async addStudent(@TransactionManager() manager: EntityManager, student: Student): Promise<Student> {
    return manager.save<Student>(student);
  }
}