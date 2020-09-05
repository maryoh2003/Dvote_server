import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, RelationId, Column } from "typeorm";
import Question from "./question";

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
}