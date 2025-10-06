import { useDependencies } from "@/modules/di";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USE_QUERY_GEAR_RULES_KEY } from "../queries/useQueryGearRules";

export const useMutationDeleteGearRule = () => {
  const { gearRuleRepository } = useDependencies();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (id: string) => gearRuleRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USE_QUERY_GEAR_RULES_KEY] });
    },
  });

  return { deleteGearRule: mutate, ...rest };
};
