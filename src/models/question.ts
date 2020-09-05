import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, RelationId } from "typeorm";
import Vote from "./vote";

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
}