import { useDependencies } from "@/modules/di";
import { useQuery } from "@tanstack/react-query";

export const useQueryCurrentWeather = (city: string) => {
  const { forecastRepository } = useDependencies();

  return useQuery({
    queryKey: ["weather", "current", city],
    queryFn: () => forecastRepository.getCurrentWeather(city),
  });
};
