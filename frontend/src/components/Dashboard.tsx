import { useState } from "react";
import {
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  RefreshCw,
} from "lucide-react";
import { Gear } from "@/modules/gears/domain/gear.domain";
import { DEFAULT_CITY } from "@/modules/forecast/infrastructure/open-meteo-forecast.repository";
import { useQueryCurrentWeather } from "@/modules/forecast/application";
import { useMinimumLoadingTime } from "@/hooks/useMinimumLoadingTime";

export default function Dashboard() {
  const [city, _] = useState<string>(DEFAULT_CITY);
  const gear: Gear[] = [];

  const { data: weather, isLoading, error, refetch, isFetching } = useQueryCurrentWeather(city);
  const isRefreshing = useMinimumLoadingTime(isFetching);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
          <p className="text-red-600 mb-4">{error instanceof Error ? error.message : "Failed to load data"}</p>
          <button
            onClick={() => refetch()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="h-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Ride Advisor
          </h1>
          <p className="text-gray-600">
            Your daily gear recommendation for {city}
          </p>
        </div>

        {/* Weather Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Current Weather
            </h2>
            <button
              onClick={() => refetch()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                {weather.isRaining ? (
                  <CloudRain className="w-12 h-12 text-blue-600" />
                ) : (
                  <Cloud className="w-12 h-12 text-blue-600" />
                )}
              </div>
              <div>
                <p className="text-5xl font-bold text-gray-800">
                  {weather.temperature}°C
                </p>
                <p className="text-lg text-gray-600">{weather.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Thermometer className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  Temperature: {weather.temperature}°C
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Droplets className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  Humidity: {weather.humidity}%
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  Wind: {weather.windSpeed} km/h
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CloudRain className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">
                  {weather.isRaining ? "Raining" : "Dry"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gear Recommendation */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Recommended Gear
          </h2>

          {gear.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gear.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200"
                >
                  <p className="font-medium text-gray-800">{item.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                No gear recommendations yet. Configure your gear rules in the
                settings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
