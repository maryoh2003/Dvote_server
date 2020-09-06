import { Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import Teacher from "./teacher";

@Entity('admin')
export default class Admin {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @JoinColumn({ name: 'fk_teacher_idx' })
  @OneToOne(type => Teacher, {
    onDelete: 'CASCADE'
  })
  teacher: Teacher;
}