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

    if (!data) return;

    data.dt <= data.sys.sunrise || data.dt >= data.sys.sunset
      ? setTimeOfDay("Night")
      : setTimeOfDay("Day");
  }, [data]);

  return (
    <div className="container">
      <div className="row align-items-center justify-content-center ">
        <div className="col-lg-4 m-auto">
          <SearchBar setFetchDataQuery={setFetchDataQuery} />
          {FetchDataQuery.error && (
            <p className="fw-bold text-danger">{FetchDataQuery.error}</p>
          )}
          {FetchDataQuery.isLoading && (
            <div className="text-center">
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
