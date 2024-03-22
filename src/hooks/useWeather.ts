
import { useEffect } from "react";
import { FetchDataQuery } from "../App";
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

const useWeather = (locationQuery: LocationQuery, setFetchDataQuery: (fetchDataQuery: FetchDataQuery) => void, errMessage = "", deps?: any[]) => {

  useEffect(() => {
      const controller = new AbortController();

      setFetchDataQuery({
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
              setFetchDataQuery({
                  data: res.data,
                  error: res.data && errMessage === "" ? "" : errMessage,
                  isLoading: false,
              });
          })
          .catch((err: Error | AxiosError) => {
              if(err instanceof CanceledError) return;

              setFetchDataQuery({
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