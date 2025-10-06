import { useEffect, useState } from "react";
import {
  Calendar,
  CloudRain,
  Cloud,
  Thermometer,
  Droplets,
  RefreshCw,
} from "lucide-react";
import { fetchForecast, type DailyForecast } from "../lib/weather";
import {
  getUserCity,
  getRecommendedGear,
  type GearItem,
} from "../lib/gearRecommendation";

export default function Forecast() {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [gear, setGear] = useState<GearItem[]>([]);
  const [city, setCity] = useState<string>("Nantes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userCity = await getUserCity();
      setCity(userCity);

      const forecastData = await fetchForecast(userCity, 7);
      setForecast(forecastData);

      if (selectedDay !== null && forecastData[selectedDay]) {
        await loadGearForDay(forecastData[selectedDay]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load forecast");
    } finally {
      setLoading(false);
    }
  };

  const loadGearForDay = async (day: DailyForecast) => {
    const avgTemp = (day.tempMax + day.tempMin) / 2;
    const weatherData = {
      temperature: Math.round(avgTemp),
      isRaining: day.isRaining,
      description: day.description,
      humidity: 0,
      windSpeed: 0,
    };
    const recommendedGear = await getRecommendedGear(weatherData);
    setGear(recommendedGear);
  };

  const handleDayClick = async (index: number) => {
    setSelectedDay(index);
    await loadGearForDay(forecast[index]);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading forecast...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              7-Day Forecast
            </h1>
            <p className="text-gray-600">Weather forecast for {city}</p>
          </div>
          <button
            onClick={loadData}
            className="p-3 hover:bg-white rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Forecast Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {forecast.map((day, index) => (
            <button
              key={day.date}
              onClick={() => handleDayClick(index)}
              className={`bg-white rounded-2xl shadow-lg p-6 text-left transition-all hover:shadow-xl ${
                selectedDay === index
                  ? "ring-4 ring-blue-500 ring-opacity-50"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {day.dayName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {day.isRaining ? (
                  <CloudRain className="w-8 h-8 text-blue-600" />
                ) : (
                  <Cloud className="w-8 h-8 text-blue-400" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-800">
                    {day.tempMax}°
                  </span>
                  <span className="text-xl text-gray-500">{day.tempMin}°</span>
                </div>

                <p className="text-sm font-medium text-gray-600">
                  {day.description}
                </p>

                {day.precipitation > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <Droplets className="w-4 h-4" />
                    <span>{day.precipitation.toFixed(1)} mm</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Day Details */}
        {selectedDay !== null && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                {forecast[selectedDay].dayName} - Gear Recommendations
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Weather Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Weather Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Thermometer className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">
                      High: {forecast[selectedDay].tempMax}°C / Low:{" "}
                      {forecast[selectedDay].tempMin}°C
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {forecast[selectedDay].isRaining ? (
                      <CloudRain className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Cloud className="w-5 h-5 text-gray-500" />
                    )}
                    <span className="text-gray-700">
                      {forecast[selectedDay].isRaining ? "Rainy" : "Dry"}
                    </span>
                  </div>
                  {forecast[selectedDay].precipitation > 0 && (
                    <div className="flex items-center space-x-3">
                      <Droplets className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">
                        Precipitation:{" "}
                        {forecast[selectedDay].precipitation.toFixed(1)} mm
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Gear */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recommended Gear
                </h3>
                {gear.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {gear.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border-2 border-green-200"
                      >
                        <p className="font-medium text-gray-800 text-sm">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    No gear recommendations. Configure rules in settings.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
