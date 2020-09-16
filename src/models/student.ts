import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, RelationId, OneToMany } from "typeorm";
import Member from "./member";
import OptionChoice from "./option_choice";
import TargetGroup from './targetGroup';

/**
 * @description 학생
 */
@Entity('student')
export default class Student {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @Column({ name: 'grade' })
  grade: number;

  @Column({ name: 'classroom' })
  classroom: number;

  @Column({ name: 'student_number' })
  studentNumber: number;

  @JoinColumn({ name: 'fk_member_email' })
  @OneToOne(type => Member, {
    onDelete: 'CASCADE',
    nullable: false
  })
  member: Member;

  @RelationId((student: Student) => student.member)
  memberEmail: string;

  @OneToMany(type => OptionChoice, optionChoice => optionChoice.student)
  optionChoices: OptionChoice[];

  @OneToMany(type => TargetGroup, targetGroup => targetGroup.student)
  targetGroups: TargetGroup[];
}