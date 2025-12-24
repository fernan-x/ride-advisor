import { useDependencies } from "@/modules/di";
import { useQuery } from "@tanstack/react-query";

export const USE_QUERY_GEARS_KEY = "gears";
export const useQueryGears = () => {
  const { gearRepository } = useDependencies();

  return useQuery({
    queryKey: [USE_QUERY_GEARS_KEY],
    queryFn: () => gearRepository.getAll(),
  });
};
