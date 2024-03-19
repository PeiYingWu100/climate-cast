import { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import useWeather from "./hooks/useWeather";

export interface WeatherQuery {
  location: string | null;
  lat: number | null;
  lon: number | null;
}

function App() {
  const [watherQuery, setWeatherQuery] = useState<WeatherQuery>({
    location: "Sydney",
    lat: null,
    lon: null,
  } as WeatherQuery);

  const { data: weatherData, error, isLoading } = useWeather(watherQuery);

  return (
    <div className="container mt-5">
      {error && <p className="fw-bold text-danger">Sorry! {error}</p>}
      {isLoading && (
        <div className="text-center">
          <p>Loading your current location...</p>
          <div className="spinner-border"></div>
        </div>
      )}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;
