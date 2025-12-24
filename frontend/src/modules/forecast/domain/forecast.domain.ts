export type WeatherData = {
  temperature: number;
  isRaining: boolean;
  description: string;
  humidity: number;
  windSpeed: number;
};

export type DailyForecast = {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  isRaining: boolean;
  description: string;
};
