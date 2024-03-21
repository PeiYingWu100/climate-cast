
import { useEffect } from "react";
import { WeatherCardQuery } from "../App";
import apiClient, { CanceledError } from "../services/apiClient";
import { AxiosError } from "axios";
import { LocationQuery } from "./useCurrentLocation";

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

const useWeather = (locationQuery: LocationQuery, setWeatherCardQuery: (weatherSearchQuery: WeatherCardQuery) => void, errMessage = "", deps?: any[]) => {

  useEffect(() => {
      const controller = new AbortController();

      setWeatherCardQuery({
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
            },
            signal: controller.signal
          })
          .then((res) => {
              setWeatherCardQuery({
                  data: res.data,
                  error: res.data && errMessage === "" ? "" : errMessage,
                  isLoading: false,
              });
          })
          .catch((err: Error | AxiosError) => {
              if(err instanceof CanceledError) return;

              setWeatherCardQuery({
                  data: null,
                  error: err.message,
                  isLoading: false,
              });
          })
          // .finally(() => setIsLoading(false));

          return () => controller.abort();
  }, deps ? [...deps] : []);

  // return {weatherCardQuery}
}

export default useWeather;