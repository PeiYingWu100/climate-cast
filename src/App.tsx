import "./App.css";
import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import apiClient from "./services/apiClient";
import { AxiosError } from "axios";

export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<WeatherData>(
        "/data/2.5/weather?lat=-33.80698855&lon=151.0213894532821&units=metric"
      )
      .then((res) => {
        console.log(res.data);
        setWeatherData(res.data);
        setError("");
      })
      .catch((err: Error | AxiosError) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="container mt-5">
      {error && <p className="fw-bold text-danger">Sorry! {error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;
