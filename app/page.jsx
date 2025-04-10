"use client";
import { useDispatch, useSelector } from "react-redux";
import { getData, setLocation } from "./store/slices/weatherSlice";
import { useState, useEffect } from "react";

export default function WeatherPage() {
  const dispatch = useDispatch();
  const { weatherData, location, error, loading } = useSelector(
    (state) => state.weather
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad && !location) {
      dispatch(setLocation(""));
      setIsInitialLoad(false);
    }
  }, [dispatch, isInitialLoad, location]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (location.trim()) {
      dispatch(getData(location));
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-100">
            Weather Forecast
          </h1>
          <p className="text-blue-100">
            Get accurate weather information worldwide
          </p>
        </header>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative flex items-center max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for a city..."
              className="w-full p-4 pr-12 text-gray-800 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={location}
              onChange={(e) => dispatch(setLocation(e.target.value))}
            />
            <button
              type="submit"
              className="absolute right-2 p-2 text-blue-600 hover:text-blue-800"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          {error && (
            <div className="mt-3 text-center bg-red-500/90 text-white py-2 px-4 rounded-lg max-w-md mx-auto animate-fade-in">
              City not found. Please try another location.
            </div>
          )}
        </form>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-300 border-t-transparent border-solid rounded-full animate-spin mb-4"></div>
            <p className="text-blue-100">Fetching weather data...</p>
          </div>
        )}

        {/* Current Weather */}
        {weatherData && weatherData.current && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-10 transition-all duration-300 hover:shadow-2xl">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {weatherData.location.name}, {weatherData.location.country}
                  </h2>
                  <p className="text-blue-100">
                    {formatDate(weatherData.location.localtime)}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 text-right">
                  <p className="text-sm text-blue-100">
                    Local Time: {weatherData.location.localtime.split(" ")[1]}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <img
                    src={weatherData.current.condition.icon.replace(
                      "64x64",
                      "128x128"
                    )}
                    alt={weatherData.current.condition.text}
                    className="w-24 h-24"
                  />
                  <div className="ml-4">
                    <p className="text-xl capitalize">
                      {weatherData.current.condition.text}
                    </p>
                    <p className="text-sm text-blue-100">
                      Feels like: {weatherData.current.feelslike_c}°C
                    </p>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <p className="text-6xl font-light">
                    {weatherData.current.temp_c}°
                    <span className="text-4xl">C</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">Wind</p>
                  <p className="text-xl">{weatherData.current.wind_kph} km/h</p>
                  <p className="text-xs text-blue-100">
                    {weatherData.current.wind_dir}
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">Humidity</p>
                  <p className="text-xl">{weatherData.current.humidity}%</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">UV Index</p>
                  <p className="text-xl">{weatherData.current.uv}</p>
                  <p className="text-xs text-blue-100">
                    {weatherData.current.uv <= 2
                      ? "Low"
                      : weatherData.current.uv <= 5
                      ? "Moderate"
                      : weatherData.current.uv <= 7
                      ? "High"
                      : weatherData.current.uv <= 10
                      ? "Very High"
                      : "Extreme"}
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">Pressure</p>
                  <p className="text-xl">
                    {weatherData.current.pressure_mb} mb
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">Visibility</p>
                  <p className="text-xl">{weatherData.current.vis_km} km</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">Precipitation</p>
                  <p className="text-xl">{weatherData.current.precip_mm} mm</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forecast */}
        {weatherData && weatherData.forecast && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-6 text-center">
              7-Day Forecast
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {weatherData.forecast.forecastday.map((day) => (
                <div
                  key={day.date}
                  className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-5 hover:bg-white/15 transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold mb-2">
                    {new Date(day.date).toLocaleDateString(undefined, {
                      weekday: "long",
                    })}
                  </h4>
                  <p className="text-sm text-blue-100 mb-4">
                    {new Date(day.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <img
                      src={day.day.condition.icon.replace("64x64", "128x128")}
                      alt={day.day.condition.text}
                      className="w-16 h-16"
                    />
                    <div className="text-right">
                      <p className="text-lg">{day.day.maxtemp_c}°</p>
                      <p className="text-sm text-blue-100">
                        {day.day.mintemp_c}°
                      </p>
                    </div>
                  </div>
                  <p className="text-sm capitalize mb-3">
                    {day.day.condition.text}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-100">Rain:</span>
                      <span>{day.day.daily_chance_of_rain}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Sunrise:</span>
                      <span>{day.astro.sunrise}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Sunset:</span>
                      <span>{day.astro.sunset}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center text-sm text-blue-100/70 mt-12">
          <p>Weather data provided by WeatherAPI.com</p>
          <p className="mt-1">© {new Date().getFullYear()} Weather App</p>
        </footer>
      </div>
    </div>
  );
}
