import { useEffect, useState } from "react";
import { AxiosError, CanceledError } from "axios";
import apiClient from "../services/apiClient";

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

const useWeather = () =>{
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const controller = new AbortController();

      apiClient
        .get<WeatherData>(
          "/data/2.5/weather?lat=-33.80698855&lon=151.0213894532821&units=metric", {signal: controller.signal}
        )
        .then((res) => {
          setWeatherData(res.data);
          if(weatherData) setError("");
        })
        .catch((err: Error | AxiosError) => {
            if(err instanceof CanceledError) return;

            setError(err.message);
        });

        return () => controller.abort();
    }, []);

    return {weatherData, error}
}

export default useWeather;