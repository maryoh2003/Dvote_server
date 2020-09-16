import { Service } from "typedi";
import Target from '@models/target';
import { InjectRepository } from "typeorm-typedi-extensions";
import TargetRepository from "@repository/target.repository";

@Service()
export default class TargetService {

  constructor(
    @InjectRepository()
    private readonly targetRepository: TargetRepository,
  ) { }

  /**
   * @description 타겟 조회
   */
  public getTarget = async (idx: number): Promise<Target> => {
    const target = this.targetRepository.getTargetByIdx(idx);

    if (target === undefined) {
      return null;
    }

    return target;
  }

  /**
   * @description 타겟 전체 조회
   */
  public getTargets = async (): Promise<Target[]> => {
    const targets = this.targetRepository.getTargets();
    return targets;
  }
}