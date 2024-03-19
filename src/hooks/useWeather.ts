import { useEffect, useState } from "react";
import { AxiosError, CanceledError } from "axios";
import apiClient from "../services/apiClient";
import useData from "./useData";
import { WeatherQuery } from "../App";

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

const useWeather = (weatherQuery: WeatherQuery) => useData<WeatherData>("/data/2.5/weather",
{
  params: {
    q: weatherQuery.location,
    lat: weatherQuery.lat,
    lon: weatherQuery.lon,
  },
})

export default useWeather;