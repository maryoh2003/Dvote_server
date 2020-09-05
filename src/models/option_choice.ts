import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, RelationId } from "typeorm";
import Student from "./student";
import Option from "./option";

@Entity('option_choice')
export default class OptionChoice {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @JoinColumn({ name: 'fk_student_idx' })
  @ManyToOne(type => Student, {
    onDelete: 'CASCADE'
  })
  student: Student;

  @RelationId((optionChoice: OptionChoice) => optionChoice.student)
  studentIdx: number;

  @JoinColumn({ name: 'fk_option_idx' })
  @ManyToOne(type => Option, {
    onDelete: 'CASCADE'
  })
  option: Option;

  @RelationId((optionChoice: OptionChoice) => optionChoice.option)
  optionIdx: number;
}
