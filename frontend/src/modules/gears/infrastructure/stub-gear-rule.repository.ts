import { GearRule } from "../domain/gear-rule.domain";
import { GearRuleFactory } from "../domain/gear-rule.factory";
import { IGearRuleRepository } from "../domain/gear-rule.repository";

export class StubGearRuleRepository implements IGearRuleRepository {
  private gearRules: GearRule[] = [
    GearRuleFactory.create({
      id: "11000000-0000-0000-0000-000000000001",
      rainCondition: "all",
      gearId: "00000000-0000-0000-0000-000000000001",
    }),
    GearRuleFactory.create({
      id: "11000000-0000-0000-0000-000000000002",
      rainCondition: "all",
      maxTemperature: 5,
      gearId: "00000000-0000-0000-0000-000000000002",
    }),
    GearRuleFactory.create({
      id: "11000000-0000-0000-0000-000000000003",
      rainCondition: "wet",
      gearId: "00000000-0000-0000-0000-000000000003",
    }),
  ];

  create(gearRule: GearRule): Promise<GearRule> {
    this.gearRules.push(gearRule);
    return Promise.resolve(gearRule);
  }
  getAll(): Promise<GearRule[]> {
    return Promise.resolve(this.gearRules);
  }
  delete(id: string): Promise<void> {
    this.gearRules = this.gearRules.filter((gearRule) => gearRule.id !== id);
    return Promise.resolve();
  }
}
