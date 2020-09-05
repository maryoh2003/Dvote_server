import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, RelationId, OneToMany } from "typeorm";
import Member from "./member";
import Vote from "./vote";

/**
 * @description 선생님
 */
@Entity('teacher')
export default class Teacher {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @Column({ name: 'position' })
  position: string;

  @JoinColumn({ name: 'fk_member_email' })
  @OneToOne(type => Member, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  member: Member;

  @RelationId((teacher: Teacher) => teacher.member)
  memberEmail: string;

  @OneToMany(type => Vote, vote => vote.teacher)
  votes: Vote[];
}