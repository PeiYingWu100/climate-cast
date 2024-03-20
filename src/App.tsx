import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import useCurrentLocation from "./hooks/useCurrentLocation";
import { useEffect, useState } from "react";
import useWeather, { WeatherData } from "./hooks/useWeather";

export interface LocationQuery {
  location: string | null;
  lat: number | null;
  lon: number | null;
}

export interface WeatherCardQuery {
  data: WeatherData | null;
  error: string;
  isLoading: boolean;
}

function App() {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>({
    location: "Sydney",
    lat: null,
    lon: null,
  });

  const [weatherCardQuery, setWeatherCardQuery] = useState<WeatherCardQuery>(
    {} as WeatherCardQuery
  );

  // Default location
  const { data, error, isLoading } = useCurrentLocation();

  useEffect(() => {
    setWeatherCardQuery({ data, error, isLoading });
  }, [data]);

  // Search Location
  const { loadScript } = useWeather(locationQuery);
  const {
    data: weatherData,
    error: weatherError,
    isLoading: isWeatherLoading,
  } = loadScript();

  useEffect(() => {
    setWeatherCardQuery({
      data: weatherData,
      error: weatherError,
      isLoading: isWeatherLoading,
    });
  }, [locationQuery]);

  return (
    <div className="container mt-5">
      <SearchBar onSearch={setLocationQuery} />
      {weatherCardQuery.error && (
        <p className="fw-bold text-danger">Sorry! {weatherCardQuery.error}</p>
      )}
      {weatherCardQuery.isLoading && (
        <div className="text-center">
          <p>Loading your current location...</p>
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
