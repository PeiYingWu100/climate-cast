import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import useWeather from "../hooks/useWeather";
import { FetchDataQuery } from "../App";
import { LocationQuery } from "../hooks/useCurrentLocation";

interface Props {
  setFetchDataQuery: (fetchDataQuery: FetchDataQuery) => void;
}

const SearchBar = ({ setFetchDataQuery }: Props) => {
  const [locationQuery, setLocationQuery] = useState<LocationQuery>(
    {} as LocationQuery
  );

  useWeather(locationQuery, setFetchDataQuery, "", [locationQuery.location]);

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
