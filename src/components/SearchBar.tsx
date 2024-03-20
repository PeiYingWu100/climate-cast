import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

export interface LocationQuery {
  location: string | null;
  lat: number | null;
  lon: number | null;
}

interface Props {
  onSearch: (locationQuery: LocationQuery) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch({location: ref.current.value, lat: null, lon: null});
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
