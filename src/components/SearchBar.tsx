import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useWeather from "../hooks/useWeather";
import { WeatherCardQuery } from "../App";
import { LocationQuery } from "../hooks/useCurrentLocation";

interface Props {
  setWeatherCardQuery: (weatherSearchQuery: WeatherCardQuery) => void;
}

const SearchBar = ({ setWeatherCardQuery }: Props) => {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>(
    {} as LocationQuery
  );

  useWeather(locationQuery, setWeatherCardQuery, "", [locationQuery.location]);

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
