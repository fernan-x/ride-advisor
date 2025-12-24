import { IGearRepository } from "@/modules/gears/domain/gear.repository";
import { StubGearRepository } from "../gears/infrastructure/stub-gear.repository";
import { createContext, useContext } from "react";
import { StubGearRuleRepository } from "../gears/infrastructure/stub-gear-rule.repository";
import { IGearRuleRepository } from "../gears/domain/gear-rule.repository";
import { IForecastRepository } from "../forecast/domain/forecast.repository";
import { OpenMeteoForecastRepository } from "../forecast/infrastructure/open-meteo-forecast.repository";

export type Dependencies = {
  gearRepository: IGearRepository;
  gearRuleRepository: IGearRuleRepository;
  forecastRepository: IForecastRepository;
};

const dependencies: Dependencies = {
  gearRepository: new StubGearRepository(),
  gearRuleRepository: new StubGearRuleRepository(),
  forecastRepository: new OpenMeteoForecastRepository(),
};

const DependenciesContext = createContext<Dependencies>(dependencies);

export const DependenciesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
};

export const useDependencies = () => {
  const deps = useContext(DependenciesContext);
  if (!deps) {
    throw new Error(
      "useDependencies must be used within a DependenciesProvider",
    );
  }
  return deps;
};
