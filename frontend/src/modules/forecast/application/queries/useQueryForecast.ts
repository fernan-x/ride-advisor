import { useDependencies } from "@/modules/di";
import { useQuery } from "@tanstack/react-query";

export const useQueryForecast = (city: string, days: number = 7) => {
  const { forecastRepository } = useDependencies();

  return useQuery({
    queryKey: ["weather", "forecast", city, days],
    queryFn: () => forecastRepository.getForecast(city, days),
  });
};
