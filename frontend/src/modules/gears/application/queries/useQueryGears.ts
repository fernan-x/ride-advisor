import { useDependencies } from "@/modules/di";
import { useQuery } from "@tanstack/react-query";

export const useQueryGears = () => {
  const { gearRepository } = useDependencies();

  return useQuery({
    queryKey: ["gears"],
    queryFn: () => gearRepository.getAll(),
  });
};
