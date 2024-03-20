import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { WeatherData } from "../hooks/useWeather";
import { WeatherCardQuery } from "../App";
import apiClient from "../services/apiClient";
import { AxiosError } from "axios";

export interface LocationQuery {
  location: string | null;
  lat: number | null;
  lon: number | null;
}

interface Props {
  setWeatherCardQuery: (weatherSearchQuery: WeatherCardQuery) => void;
}

const SearchBar = ({ setWeatherCardQuery }: Props) => {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>(
    {} as LocationQuery
  );

  useEffect(() => {
    if (!locationQuery.location) return;

    setWeatherCardQuery({
      data: null,
      error: "",
      isLoading: true,
    });

    apiClient
      .get<WeatherData>(
        `/data/2.5/weather?q=${locationQuery.location}&units=metric`
      )
      .then((res) => {
        setWeatherCardQuery({
          data: res.data,
          error: res.data ? "" : "empty data",
          isLoading: false,
        });
        // if (data) setError("");
      })
      .catch((err: Error | AxiosError) => {
        setWeatherCardQuery({
          data: null,
          error: err.message,
          isLoading: false,
        });
      });
  }, [locationQuery.location]);

  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current)
          setLocationQuery({
            location: ref.current.value,
            lat: null,
            lon: null,
          });
      }}
    >
      <div className="input-group mb-3">
        <input
          ref={ref}
          type="text"
          id="searchBar"
          className="form-control"
          placeholder="Enter city"
        />
        <button type="submit" className="btn btn-primary">
          <BsSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
