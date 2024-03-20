import "./App.css";
import WeatherCard from "./components/WeatherCard";
import useCurrentLocation from "./hooks/useCurrentLocation";
import { useState } from "react";

export interface LocationQuery {
  location: string | null;
  lat: number | null;
  lon: number | null;
}

function App() {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>({
    location: "Sydeny",
    lat: null,
    lon: null,
  });

  const { data: weatherData, error, isLoading } = useCurrentLocation();

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
