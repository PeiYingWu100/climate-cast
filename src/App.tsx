import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import useCurrentLocation from "./hooks/useCurrentLocation";
import { useEffect, useState } from "react";
import { WeatherData } from "./hooks/useWeather";

export interface FetchDataQuery {
  data: WeatherData | null;
  error: string;
  isLoading: boolean;
}

function App() {
  const [FetchDataQuery, setFetchDataQuery] = useState<FetchDataQuery>(
    {} as FetchDataQuery
  );
  const [timeOfDay, setTimeOfDay] = useState<string | null>(null);

  // Default location
  const { data, error, isLoading } = useCurrentLocation();

  useEffect(() => {
    setFetchDataQuery({ data, error, isLoading });
  }, [data]);

  // Day / Night time
  useEffect(() => {
    if (!FetchDataQuery.data) return;

    FetchDataQuery.data.weather[0].icon.includes("n")
      ? setTimeOfDay("Night")
      : setTimeOfDay("Day");
  }, [FetchDataQuery]);

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center ">
        <div className="col-lg-4 m-auto" style={{ minHeight: "500px" }}>
          <SearchBar setFetchDataQuery={setFetchDataQuery} />
          {FetchDataQuery.error && (
            <p className="fw-bold text-danger">{FetchDataQuery.error}</p>
          )}
          {FetchDataQuery.isLoading && (
            <div className="text-center text-light">
              <p>Loading... </p>
              <div className="spinner-border"></div>
            </div>
          )}
          {FetchDataQuery.data && (
            <WeatherCard
              weatherData={FetchDataQuery.data}
              timeOfDay={timeOfDay}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
