import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, RelationId, OneToMany } from "typeorm";
import Target from "./target";
import Student from './student';

@Entity('target_group')
export default class TargetGroup {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @JoinColumn({ name: 'fk_target_idx' })
  @ManyToOne(type => Target, {
    onDelete: 'CASCADE'
  })
  target: Target;

  @RelationId((targetGroup: TargetGroup) => targetGroup.target)
  targetIdx: number;

  @JoinColumn({ name: 'fk_student_idx' })
  @ManyToOne(type => Student, {
    onDelete: 'CASCADE'
  })
  student: Student;

  @RelationId((targetGroup: TargetGroup) => targetGroup.student)
  studentIdx: number;
}