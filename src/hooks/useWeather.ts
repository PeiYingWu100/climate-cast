import { LocationQuery } from "../App";
import useData from "./useData";

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

const useWeather = (locationQuery: LocationQuery) => useData<WeatherData>("/data/2.5/weather",
{
  params: {
    q: locationQuery.location,
    lat: locationQuery.lat,
    lon: locationQuery.lon,
  },
})

export default useWeather;