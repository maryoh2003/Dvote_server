import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * @description 타겟 
 */
@Entity('target')
export default class Target {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @Column({ name: 'target' })
  target: string;
}

