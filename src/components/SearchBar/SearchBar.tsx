import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useWeather from "../../hooks/useWeather";
import { FetchWeatherQuery } from "../../App";
import { LocationQuery } from "../../hooks/useCurrentLocation";
import styles from "./SearchBar.module.css";
import SearchDropdown from "./SearchDropdown";

interface Props {
  isLoading: boolean;
  setFetchWeatherQuery: (FetchWeatherQuery: FetchWeatherQuery) => void;
  setInputCity: (inputCity: string) => void;
}

const SearchBar = ({
  isLoading,
  setFetchWeatherQuery,
  setInputCity,
}: Props) => {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>(
    {} as LocationQuery
  );

  // For the search input dropdown
  const [city, setCity] = useState<string | null>(null);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 3) return;
    setCity(event.target.value);
  };

  // get wather
  useWeather(locationQuery, setFetchWeatherQuery, "", [
    locationQuery.location,
    locationQuery.lat,
  ]);

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
        setCity(null);
      }}
    >
      <div className="input-group mb-3">
        <div className="position-relative flex-grow-1 flex-shrink-1">
          <input
            ref={ref}
            type="text"
            id={styles.searchBar}
            className="form-control rounded-0"
            placeholder="Enter a Location"
            onChange={handleCityChange}
            required
            disabled={isLoading}
          />
          {city && (
            <SearchDropdown
              city={city}
              inputRef={ref}
              setLocationQuery={setLocationQuery}
              setCity={setCity}
              setInputCity={setInputCity}
            />
          )}
        </div>
        <button type="submit" className="btn btn-warning" disabled={isLoading}>
          <BsSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
