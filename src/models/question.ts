import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, RelationId, OneToMany } from "typeorm";
import Vote from "./vote";
import Option from './option';

@Entity('question')
export default class Question {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @Column({ name: 'question' })
  question: string;

  @JoinColumn({ name: 'fk_vote_idx' })
  @ManyToOne(type => Vote, {
    onDelete: 'CASCADE'
  })
  vote: Vote;

  @RelationId((question: Question) => question.vote)
  voteIdx: number;

  @OneToMany(type => Option, option => option.question)
  options: Option[];
}