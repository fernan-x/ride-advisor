import { GearRule } from "./gear-rule.domain";
import { v4 as uuidv4 } from "uuid";

export const GearRuleFactory = {
  create(data: Partial<GearRule> & Pick<GearRule, "gearId">): GearRule {
    return {
      id: data?.id ?? uuidv4(),
      rainCondition: data?.rainCondition ?? "all",
      gearId: data.gearId,
      minTemperature: data?.minTemperature,
      maxTemperature: data?.maxTemperature,
    };
  },
};
