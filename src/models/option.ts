import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, RelationId, Column, OneToMany } from "typeorm";
import Question from "./question";
import OptionChoice from "./option_choice";

@Entity('option')
export default class Option {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @JoinColumn({ name: 'fk_question_idx' })
  @ManyToOne(type => Question, {
    onDelete: 'CASCADE'
  })
  question: Question;

  @RelationId((option: Option) => option.question)
  questionIdx: number;

  @Column({ name: 'option' })
  option: string;

  @Column({ name: 'is_multiple' })
  isMultiple: boolean;

  @OneToMany(type => OptionChoice, optionChoice => optionChoice.option)
  optionChoices: OptionChoice[];
}