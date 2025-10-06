import { GearRule } from "../../domain/gear-rule.domain";
import { Gear } from "../../domain/gear.domain";

const RAIN_CONDITION_LABELS = {
  all: "tout le temps",
  wet: "quand il pleut",
  dry: "quand il ne pleut pas",
};

export const getRuleDescription = (rule: GearRule, gears?: Gear[]) => {
  const gearName =
    gears?.find((gear) => gear.id === rule.gearId)?.name ??
    "Équipement inconnu";
  let weatherLabel = null;

  if (rule.minTemperature && rule.maxTemperature) {
    weatherLabel = `entre ${rule.minTemperature}°C et ${rule.maxTemperature}°C`;
  } else if (rule.minTemperature) {
    weatherLabel = `au dessus de ${rule.minTemperature}°C`;
  } else if (rule.maxTemperature) {
    weatherLabel = `en dessous de ${rule.maxTemperature}°C`;
  }

  return `${gearName}: ${RAIN_CONDITION_LABELS[rule.rainCondition]}${weatherLabel ? `, ${weatherLabel}` : ""}`;
};
