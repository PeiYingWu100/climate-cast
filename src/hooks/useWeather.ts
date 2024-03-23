
import { useEffect } from "react";
import { FetchWeatherQuery } from "../App";
import apiClient, { CanceledError } from "../services/apiClient";
import { AxiosError } from "axios";
import { LocationQuery } from "./useCurrentLocation";

export interface WeatherData {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather:{
    main: string;
    description: string;
    icon: string;
  }[]
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

const useWeather = (locationQuery: LocationQuery, setFetchWeatherQuery: (FetchWeatherQuery: FetchWeatherQuery) => void, errMessage = "", deps?: any[]) => {

  useEffect(() => {
      const controller = new AbortController();

      setFetchWeatherQuery({
          data: null,
          error: "",
          isLoading: true,
      });

      if (!locationQuery.location && !locationQuery.lat ) return;

      apiClient
          .get<WeatherData>("/data/2.5/weather", { 
            params:{
              q: locationQuery.location,
              lat: locationQuery.lat,
              lon: locationQuery.lon,
              units: "metric",
            },
            signal: controller.signal
          })
          .then((res) => {
              setFetchWeatherQuery({
                  data: res.data,
                  error: res.data && errMessage === "" ? "" : errMessage,
                  isLoading: false,
              });
          })
          .catch((err: Error | AxiosError) => {
              if(err instanceof CanceledError) return;

              if(err instanceof AxiosError && err.response?.data.message === "city not found"){
                err.message = "Oops! We couldn't find any information for that city. Please try it again!";
              }

              setFetchWeatherQuery({
                  data: null,
                  error: err.message,
                  isLoading: false,
              });
          })
          // .finally(() => setIsLoading(false));

          return () => controller.abort();
  }, deps ? [...deps] : []);
}

export default useWeather;