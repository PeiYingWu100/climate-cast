import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import useCurrentLocation from "./hooks/useCurrentLocation";
import { useEffect, useState } from "react";
import { WeatherData } from "./hooks/useWeather";

export interface WeatherCardQuery {
  data: WeatherData | null;
  error: string;
  isLoading: boolean;
}

function App() {
  const [weatherCardQuery, setWeatherCardQuery] = useState<WeatherCardQuery>(
    {} as WeatherCardQuery
  );

  // Default location
  const { data, error, isLoading } = useCurrentLocation();

  useEffect(() => {
    setWeatherCardQuery({ data, error, isLoading });
  }, [data]);

  return (
    <div className="container mt-5">
      <SearchBar setWeatherCardQuery={setWeatherCardQuery} />
      {weatherCardQuery.error && (
        <p className="fw-bold text-danger">{weatherCardQuery.error}</p>
      )}
      {weatherCardQuery.isLoading && (
        <div className="text-center">
          <p>Loading... </p>
          <div className="spinner-border"></div>
        </div>
      )}
      {weatherCardQuery.data && (
        <WeatherCard weatherData={weatherCardQuery.data} />
      )}
    </div>
  );
}

export default App;
