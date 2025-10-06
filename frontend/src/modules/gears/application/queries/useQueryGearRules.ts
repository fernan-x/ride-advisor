import { useDependencies } from "@/modules/di";
import { useQuery } from "@tanstack/react-query";

export const USE_QUERY_GEAR_RULES_KEY = "gear-rules";
export const useQueryGearRules = () => {
  const { gearRuleRepository } = useDependencies();

  return useQuery({
    queryKey: [USE_QUERY_GEAR_RULES_KEY],
    queryFn: () => gearRuleRepository.getAll(),
  });
};
