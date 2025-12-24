import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GearRule } from "../../domain/gear-rule.domain";
import { useDependencies } from "@/modules/di";
import { USE_QUERY_GEAR_RULES_KEY } from "../queries/useQueryGearRules";

export const useMutationCreateGearRule = (options?: {
  onSuccess?: () => void;
}) => {
  const { gearRuleRepository } = useDependencies();
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (rule: GearRule) => {
      await gearRuleRepository.create(rule);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_QUERY_GEAR_RULES_KEY] });
      options?.onSuccess?.();
    },
  });

  return {
    createGearRule: mutate,
    ...rest,
  };
};
