// WeatherPage.js
"use client";
import { useDispatch, useSelector } from "react-redux";
import { getData, setLocation } from "./store/slices/weatherSlice";

export default function WeatherPage() {
  const dispatch = useDispatch();
  const { weatherData, location, error, loading } = useSelector(
    (state) => state.weather
  );

  const handleSearch = async (e) => {
    if (e.key === "Enter" || e.type === "submit") {
      dispatch(getData(location));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-500 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-3xl bg-white bg-opacity-10 p-6 rounded-lg shadow-md mb-8">
            Weather App
          </h1>
          <input
            type="text"
            placeholder="Search for city"
            className="w-full p-2 text-black rounded-md outline-none"
            value={location}
            onChange={(e) => dispatch(setLocation(e.target.value))}
            onKeyDown={handleSearch}
          />
          {error && (
            <div className="bg-red-500 mt-2 p-1 rounded">
              <h1 className="font-bold">Nor Found City</h1>
            </div>
          )}
        </div>
        {loading && (
          <div class="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-700 to-blue-500">
            <div class="w-16 h-16 border-4 border-blue-300 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}
        {weatherData && weatherData.current && (
          <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-3xl font-bold">
              {weatherData.location.name}, {weatherData.location.country}
            </h2>
            <p className="text-lg mt-2">{weatherData.location.localtime}</p>
            <div className="flex items-center justify-between mt-4">
              <div>
                <img
                  src={weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                />
                <p className="text-2xl">{weatherData.current.condition.text}</p>
              </div>
              <div className="text-4xl font-bold">
                {weatherData.current.temp_c}°C
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Wind: {weatherData.current.wind_kph} km/h</p>
              <p>Humidity: {weatherData.current.humidity}%</p>
              <p>UV Index: {weatherData.current.uv}</p>
            </div>
          </div>
        )}

        {weatherData && weatherData.forecast && (
          <div>
            <h3 className="text-2xl font-bold mb-4">7-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weatherData.forecast.forecastday.map((day) => (
                <div
                  key={day.date}
                  className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md"
                >
                  <h4 className="text-xl font-bold">{day.date}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <img
                      src={day.day.condition.icon}
                      alt={day.day.condition.text}
                    />
                    <div className="text-right">
                      <p className="text-lg">{day.day.condition.text}</p>
                      <p>
                        {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
                    <p>Sunrise: {day.astro.sunrise}</p>
                    <p>Sunset: {day.astro.sunset}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
