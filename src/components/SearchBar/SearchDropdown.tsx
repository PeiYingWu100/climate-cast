import styles from "./SearchBar.module.css";
import useCity from "../../hooks/useCity";
import { LocationQuery } from "../../hooks/useCurrentLocation";

interface Props {
  city: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setLocationQuery: (locationQuery: LocationQuery) => void;
  setCity: (city: string | null) => void;
}

const SearchDropdown = ({
  city,
  inputRef,
  setLocationQuery,
  setCity,
}: Props) => {
  const { data: cities } = useCity(city, [city]);

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
    if (inputRef.current) inputRef.current.value = city + ", " + country;
  };

  return (
    <ul className="list-group position-absolute top-3 w-100 z-3">
      {cities?.map((city, ind) => (
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
  );
};

export default SearchDropdown;
