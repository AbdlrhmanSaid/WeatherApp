"use client";
import { useDispatch, useSelector } from "react-redux";
import { getData, setLocation } from "./store/slices/weatherSlice";
import { useState, useEffect } from "react";

export default function WeatherPage() {
  const dispatch = useDispatch();
  const { weatherData, location, error, loading } = useSelector(
    (state) => state.weather,
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad && !location) {
      dispatch(setLocation(""));
      setIsInitialLoad(false);
    }
  }, [dispatch, isInitialLoad, location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      dispatch(getData(location));
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600 via-slate-900 to-black text-white font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* --- Header & Search --- */}
        <header className="flex flex-col items-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
          <h1 className="text-5xl sm:text-6xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-400">
            Weather<span className="font-light">Cast</span>
          </h1>

          <form onSubmit={handleSearch} className="w-full max-w-lg mt-6">
            <div className="group relative">
              <input
                type="text"
                placeholder="Search city (e.g. Dubai, London)..."
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 py-4 px-6 pr-14 rounded-2xl text-white placeholder-blue-200/50 outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 shadow-2xl group-hover:bg-white/15"
                value={location}
                onChange={(e) => dispatch(setLocation(e.target.value))}
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:scale-110 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-400"
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
              <p className="mt-3 text-red-400 text-sm text-center font-medium">
                City not found. Try again.
              </p>
            )}
          </form>
        </header>

        {/* --- Loading State --- */}
        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        )}

        {/* --- Main Weather Card --- */}
        {weatherData && weatherData.current && (
          <main className="animate-in fade-in zoom-in-95 duration-700">
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-3xl mb-12 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>

              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-blue-300 uppercase tracking-widest text-sm font-bold">
                    <span className="w-8 h-[2px] bg-blue-300"></span>
                    Current Weather
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold">
                    {weatherData.location.name}
                  </h2>
                  <p className="text-blue-200/70 text-lg mt-1">
                    {formatDate(weatherData.location.localtime)}
                  </p>

                  <div className="mt-8 flex items-center gap-6">
                    <span className="text-8xl md:text-9xl font-black tracking-tighter italic">
                      {Math.round(weatherData.current.temp_c)}°
                    </span>
                    <div>
                      <img
                        src={weatherData.current.condition.icon.replace(
                          "64x64",
                          "128x128",
                        )}
                        alt="weather"
                        className="w-24 h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      />
                      <p className="text-xl font-medium text-cyan-300">
                        {weatherData.current.condition.text}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Feels Like",
                      val: `${weatherData.current.feelslike_c}°`,
                      icon: "🌡️",
                    },
                    {
                      label: "Humidity",
                      val: `${weatherData.current.humidity}%`,
                      icon: "💧",
                    },
                    {
                      label: "Wind",
                      val: `${weatherData.current.wind_kph} km/h`,
                      icon: "🌬️",
                    },
                    {
                      label: "UV Index",
                      val: weatherData.current.uv,
                      icon: "☀️",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/5 p-5 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-blue-200/50 text-xs font-bold uppercase mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-semibold">
                        {stat.icon} {stat.val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- 7-Day Forecast --- */}
            <section>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="bg-blue-500 w-2 h-8 rounded-full"></span>
                Next Days Forecast
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {weatherData.forecast.forecastday.map((day) => (
                  <div
                    key={day.date}
                    className="bg-white/5 border border-white/10 p-6 rounded-3xl text-center hover:bg-blue-500/20 transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <p className="text-blue-200 font-medium mb-3">
                      {new Date(day.date).toLocaleDateString(undefined, {
                        weekday: "short",
                      })}
                    </p>
                    <img
                      src={day.day.condition.icon}
                      alt="icon"
                      className="mx-auto w-12 h-12 group-hover:scale-110 transition-transform"
                    />
                    <div className="mt-4">
                      <p className="text-xl font-bold">
                        {Math.round(day.day.maxtemp_c)}°
                      </p>
                      <p className="text-blue-300/50 text-sm">
                        {Math.round(day.day.mintemp_c)}°
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        )}

        <footer className="mt-20 pt-10 border-t border-white/10 text-center text-blue-200/30 text-sm">
          <p>
            © {new Date().getFullYear()} WeatherCast • Powering by WeatherAPI
          </p>
        </footer>
      </div>
    </div>
  );
}
