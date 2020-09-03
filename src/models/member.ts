import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne, OneToMany } from "typeorm";
import { MemberType } from '@lib/enum/member';
import Student from "./student";
import Teacher from "./teacher";

/**
 * @description 멤버
 */
@Entity('member')
export default class Member {
  @PrimaryColumn({
    name: 'email',
    unique: true
  })
  email: string;

  @Column({ name: 'pw', select: false })
  pw: string;

  @Column({ name: 'name' })
  name: string;

  @Column({
    name: 'member_type',
    default: MemberType.GUEST,
    type: 'enum',
    enum: MemberType
  })
  memberType: MemberType;

  @Column({ name: 'is_allowed' })
  isAllowed: boolean;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @OneToOne(type => Student, student => student.member)
  student: Student;

  @OneToOne(type => Teacher, teacher => teacher.member)
  teacher: Teacher;
}