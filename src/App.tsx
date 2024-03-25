import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import useCurrentLocation from "./hooks/useCurrentLocation";
import { useEffect, useState } from "react";
import { WeatherData } from "./hooks/useWeather";

interface FetchDataQuery {
  error: string;
  isLoading: boolean;
}

export interface FetchWeatherQuery extends FetchDataQuery {
  data: WeatherData | null;
}

function App() {
  const [FetchWeatherQuery, setFetchWeatherQuery] = useState<FetchWeatherQuery>(
    {} as FetchWeatherQuery
  );
  const [timeOfDay, setTimeOfDay] = useState<string | null>(null);

  // Default location
  const { data, error, isLoading } = useCurrentLocation();

  useEffect(() => {
    setFetchWeatherQuery({ data, error, isLoading });
  }, [data]);

  // Day / Night time
  useEffect(() => {
    if (!FetchWeatherQuery.data) return;

    FetchWeatherQuery.data.weather[0].icon.includes("n")
      ? setTimeOfDay("Night")
      : setTimeOfDay("Day");
  }, [FetchWeatherQuery]);

  return (
    <section className="section h-100">
      <div className="container h-100">
        <div className="row align-items-center justify-content-center h-100">
          <div
            className="col-md-7 col-xl-5 m-auto p-3"
            style={{ minHeight: "500px" }}
          >
            <SearchBar
              setFetchWeatherQuery={setFetchWeatherQuery}
              isLoading={FetchWeatherQuery.isLoading}
            />
            {FetchWeatherQuery.error && (
              <div className="bg-white rounded p-3 mb-3">
                <p className="fw-bold text-danger mb-0">
                  {FetchWeatherQuery.error}
                </p>
              </div>
            )}
            {FetchWeatherQuery.isLoading && (
              <div className="text-center text-light fs-2 fw-bold">
                <p>Loading... </p>
                <div className="spinner-border"></div>
              </div>
            )}
            {FetchWeatherQuery.data && (
              <WeatherCard
                weatherData={FetchWeatherQuery.data}
                timeOfDay={timeOfDay}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
