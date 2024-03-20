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
  const [weatherCardQuery, setWeatherCardQuery] = useState<WeatherCardQuery>(
    {} as WeatherCardQuery
  );

  const [locationQuery, setLocationQuery] = useState<LocationQuery>({
    location: "Sydeny",
    lat: null,
    lon: null,
  });

  const { data, error, isLoading } = useCurrentLocation();

  useEffect(() => {
    setWeatherCardQuery({ data, error, isLoading });
  }, [data]);

  return (
    <div className="container mt-5">
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
