import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import TargetGroup from "./targetGroup";

/**
 * @description 타겟 
 */
@Entity('target')
export default class Target {
  @PrimaryGeneratedColumn({ name: 'idx' })
  idx: number;

  @Column({ name: 'target' })
  target: string;

  @OneToMany(type => TargetGroup, targetGroup => targetGroup.target)
  targetGroups: TargetGroup[];
}

