import styles from "./SearchBar.module.css";
import useCity from "../../hooks/useCity";
import { LocationQuery } from "../../hooks/useCurrentLocation";

interface Props {
  city: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setLocationQuery: (locationQuery: LocationQuery) => void;
  setCity: (city: string | null) => void;
  setInputCity: (inputCity: string) => void;
}

const SearchDropdown = ({
  city,
  inputRef,
  setLocationQuery,
  setCity,
  setInputCity,
}: Props) => {
  const { data: cities } = useCity(city, [city]);

  const handleSearchDropdownClick = (
    city: string,
    state: string | null,
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
    const cityText = `${city}${state ? ", " + state : ""}, ${country}`;
    if (inputRef.current) inputRef.current.value = cityText;
    setInputCity(cityText);
  };

  return (
    <ul className="list-group position-absolute w-100 z-2">
      {cities?.map((city, ind) => (
        <button
          key={ind}
          type="button"
          className={`list-group-item rounded-0 border-0 text-start ${
            styles.searchList
          } ${ind === cities.length - 1 ? "rounded-bottom" : ""}`}
          onClick={() =>
            handleSearchDropdownClick(
              city.name,
              city.state,
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
