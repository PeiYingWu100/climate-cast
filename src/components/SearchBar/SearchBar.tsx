import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useWeather from "../../hooks/useWeather";
import { FetchWeatherQuery } from "../../App";
import { LocationQuery } from "../../hooks/useCurrentLocation";
import styles from "./SearchBar.module.css";
import useCity from "../../hooks/useCity";

interface Props {
  setFetchWeatherQuery: (FetchWeatherQuery: FetchWeatherQuery) => void;
  isLoading: boolean;
}

const SearchBar = ({ setFetchWeatherQuery, isLoading }: Props) => {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>(
    {} as LocationQuery
  );

  // For the search input dropdown
  const [city, setCity] = useState<string | null>(null);

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 3) return;
    setCity(event.target.value);
  };

  const handleSearchDropdownClick = (
    city: string,
    country: string,
    lat: number,
    lon: number
  ) => {
    setLocationQuery({
      location: null,
      lat: lat,
      lon: lon,
    });

    // hide the dropdown
    setCity(null);

    // update the search input
    if (ref.current) ref.current.value = city + ", " + country;
  };

  const { data } = useCity(city, [city]);

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
          <ul className="list-group position-absolute top-3 w-100 z-3">
            {city &&
              data?.map((city, ind) => (
                <button
                  key={ind}
                  type="button"
                  className={`list-group-item rounded-0 text-start ${styles.searchList}`}
                  onClick={() =>
                    handleSearchDropdownClick(
                      city.name,
                      city.country,
                      city.lat,
                      city.lon
                    )
                  }
                >
                  {`${city.name}${city.state ? ", " + city.state : ""}, ${
                    city.country
                  }`}
                </button>
              ))}
          </ul>
        </div>
        <button type="submit" className="btn btn-warning" disabled={isLoading}>
          <BsSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
