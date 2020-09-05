import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, RelationId } from "typeorm";
import Member from "./member";

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

  @JoinColumn({ name: 'fk_memer_email' })
  @OneToOne(type => Member, {
    onDelete: 'CASCADE',
    nullable: false
  })
  member: Member;

  @RelationId((student: Student) => student.member)
  memberEmail: string;
}