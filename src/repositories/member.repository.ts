import Member from '@models/member';
import { EntityRepository, Repository, TransactionManager, EntityManager } from "typeorm";

@EntityRepository()
export default class MemberRepository extends Repository<Member> {

  /**
   * @description isAllowed별 회원 오름차순 정렬 전체 조회
   * @param isAllowed 
   */
  public getMembersByIsAllowed = (isAllowed: boolean): Promise<Member[]> => {
    return this.createQueryBuilder()
      .where('is_allowed = :isAllowed', { isAllowed })
      .orderBy('email', 'ASC')
      .getMany();
  }

  /**
   * @description grade와 class를 통한 학반별 전체 조회
   * @param grade 학년
   * @param classroom 학반 
   */
  public getMembersByGrade = (grade: number, classroom: number): Promise<Member[]> => {
    return this.createQueryBuilder()
      .where('grade = :grade', { grade })
      .andWhere('class = :class', { classroom })
      .orderBy('email', 'ASC')
      .getMany();
  }

  /**
   * @description email, pw를 통한 회원 조회
   * @param email 이메일
   * @param pw 비밀번호
   */
  public getMemberByEmailAndPw = (email: string, pw: string): Promise<Member> => {
    return this.createQueryBuilder()
      .where('email = :email', { email })
      .andWhere('pw = :pw', { pw })
      .getOne();
  }

  /**
   * @description email을 통한 회원 조회
   * @param email 이메일
   */
  public getMemberByEmail = (email: string): Promise<Member> => {
    return this.createQueryBuilder()
      .where('email = :email', { email })
      .getOne();
  }

  /**
   * @description 회원 추가(트랜젝션)
   * @param manager 트랜젝션 manager
   * @param member 회원 객체
   */
  public addMember(@TransactionManager() manager: EntityManager, member: Member): Promise<Member> {
    return manager.save<Member>(member);
  }

  /**
   * @description 회원 승인
   * @param email 승인할 회원 이메일
   */
  public allowMember = (email: string) => {
    this.createQueryBuilder()
      .update()
      .set({
        isAllowed: true,
      })
      .where('email = :email', { email })
      .execute();
  }
}
