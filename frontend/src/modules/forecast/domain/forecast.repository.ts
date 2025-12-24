import { DailyForecast, WeatherData } from "./forecast.domain";

export interface IForecastRepository {
  getCurrentWeather(city: string): Promise<WeatherData>;
  getForecast(city: string, days: number): Promise<DailyForecast[]>;
  getCityList(): string[];
}
