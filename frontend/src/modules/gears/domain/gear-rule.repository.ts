import { GearRule } from "./gear-rule.domain";

export interface IGearRuleRepository {
  create(gearRule: GearRule): Promise<GearRule>;
  getAll(): Promise<GearRule[]>;
  delete(id: string): Promise<void>;
}
