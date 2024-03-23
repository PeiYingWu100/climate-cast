import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useWeather from "../../hooks/useWeather";
import { FetchWeatherQuery } from "../../App";
import { LocationQuery } from "../../hooks/useCurrentLocation";
import styles from "./SearchBar.module.css";

interface Props {
  setFetchWeatherQuery: (FetchWeatherQuery: FetchWeatherQuery) => void;
  isLoading: boolean;
}

const SearchBar = ({ setFetchWeatherQuery, isLoading }: Props) => {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>(
    {} as LocationQuery
  );

  useWeather(locationQuery, setFetchWeatherQuery, "", [locationQuery.location]);

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
          id={styles.searchBar}
          className="form-control"
          placeholder="Enter a Location"
          required
          disabled={isLoading}
        />
        <button type="submit" className="btn btn-warning" disabled={isLoading}>
          <BsSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
