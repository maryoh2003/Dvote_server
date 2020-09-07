import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import Teacher from "./teacher";

@Entity('admin')
export default class Admin {
  @PrimaryColumn({ name: 'fk_teacher_idx' })
  teacherIdx: number;

  @JoinColumn({ name: 'fk_teacher_idx' })
  @OneToOne(type => Teacher, {
    onDelete: 'CASCADE'
  })
  teacher: Teacher;
}