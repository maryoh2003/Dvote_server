import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, RelationId, OneToMany } from "typeorm";
import Teacher from './teacher';
import TargetGroup from "./targetGroup";
import Question from "./question";

@Entity('vote')
export default class Vote {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @Column({ name: 'title' })
  title: string;

  @JoinColumn({ name: 'fk_target_group_idx' })
  @ManyToOne(type => TargetGroup, {
    onDelete: 'CASCADE',
  })
  targetGroup: TargetGroup;

  @RelationId((vote: Vote) => vote.targetGroup)
  targetGroupIdx: number;

  @JoinColumn({ name: 'fk_teacher_idx' })
  @ManyToOne(type => Teacher, {
    onDelete: 'CASCADE',
  })
  teacher: Teacher;

  @RelationId((vote: Vote) => vote.teacher)
  teacherIdx: number;

  @Column({ name: 'scheduled_at' })
  scheduledAt: Date;

  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(type => Question, question => question.vote)
  questions: Question[];
}