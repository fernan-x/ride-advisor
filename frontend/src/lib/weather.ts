export interface WeatherData {
  temperature: number;
  isRaining: boolean;
  description: string;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  isRaining: boolean;
  description: string;
}

const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  Nantes: { lat: 47.2184, lon: -1.5536 },
  Paris: { lat: 48.8566, lon: 2.3522 },
  Lyon: { lat: 45.764, lon: 4.8357 },
  Marseille: { lat: 43.2965, lon: 5.3698 },
  Bordeaux: { lat: 44.8378, lon: -0.5792 },
};

export const DEFAULT_CITY = "Nantes";

export async function fetchWeather(city: string): Promise<WeatherData> {
  const coords = CITY_COORDINATES[city] || CITY_COORDINATES[DEFAULT_CITY];

  // Using Open-Meteo API (free, no API key required)
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,precipitation,relative_humidity_2m,wind_speed_10m&timezone=Europe/Paris`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  const current = data.current;

  const isRaining = current.precipitation > 0;
  const temperature = Math.round(current.temperature_2m);

  let description = "";
  if (isRaining) {
    description = "Rainy";
  } else if (temperature < 5) {
    description = "Very Cold";
  } else if (temperature < 10) {
    description = "Cold";
  } else if (temperature < 15) {
    description = "Cool";
  } else if (temperature < 20) {
    description = "Mild";
  } else if (temperature < 25) {
    description = "Warm";
  } else {
    description = "Hot";
  }

  return {
    temperature,
    isRaining,
    description,
    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,
  };
}

export function getCityList(): string[] {
  return Object.keys(CITY_COORDINATES);
}

export async function fetchForecast(
  city: string,
  days: number = 7,
): Promise<DailyForecast[]> {
  const coords = CITY_COORDINATES[city] || CITY_COORDINATES[DEFAULT_CITY];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe/Paris&forecast_days=${days}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }

  const data = await response.json();
  const daily = data.daily;

  return daily.time.map((date: string, index: number) => {
    const dateObj = new Date(date);
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName =
      index === 0
        ? "Today"
        : index === 1
          ? "Tomorrow"
          : dayNames[dateObj.getDay()];

    const tempMax = Math.round(daily.temperature_2m_max[index]);
    const tempMin = Math.round(daily.temperature_2m_min[index]);
    const precipitation = daily.precipitation_sum[index];
    const isRaining = precipitation > 0.5;

    const avgTemp = (tempMax + tempMin) / 2;
    let description = "";
    if (isRaining) {
      description = "Rainy";
    } else if (avgTemp < 5) {
      description = "Very Cold";
    } else if (avgTemp < 10) {
      description = "Cold";
    } else if (avgTemp < 15) {
      description = "Cool";
    } else if (avgTemp < 20) {
      description = "Mild";
    } else if (avgTemp < 25) {
      description = "Warm";
    } else {
      description = "Hot";
    }

    return {
      date,
      dayName,
      tempMax,
      tempMin,
      precipitation,
      isRaining,
      description,
    };
  });
}
