import { WeatherData } from "../../hooks/useWeather";
import styles from "./WeatherCard.module.css";
import { FaLocationDot, FaWind } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";
import WeatherCardDetail, { weatherCardDetails } from "./WeatherCardDetail";

interface Props {
  weatherData: WeatherData;
  timeOfDay: string | null;
  inputCity: string | null;
}

const TodayWeatherCard = ({ weatherData, timeOfDay, inputCity }: Props) => {
  const weatherCardDetails: weatherCardDetails[] = [
    {
      offset: true,
      icon: <MdWaterDrop />,
      details: weatherData.main.humidity + " %",
      title: "Humidity",
      floatDirection: "float-end",
    },
    {
      offset: false,
      icon: <FaWind />,
      details: weatherData.wind.speed + " m/s",
      title: "Wind Speed",
      floatDirection: "float-start",
    },
  ];

  // capitalize the first letter
  const weatherDes = weatherData.weather[0].description;
  let weatherDesResult =
    weatherDes.charAt(0).toUpperCase() + weatherDes.slice(1);

  return (
    <div
      className={`card text-center border border-3 border-white shadow rounded  
        ${styles["bg" + timeOfDay]} 
        ${timeOfDay === "Day" ? "" : "text-white"}`}
    >
      <div className={`card-body`}>
        <h5 className="card-title">
          <FaLocationDot className="mb-1 text-danger" />
          {inputCity
            ? inputCity
            : `${weatherData.name}, ${weatherData.sys.country}`}
        </h5>
        <p className="card-text">
          {new Date(weatherData.dt * 1000).toLocaleDateString("en-GB", {
            dateStyle: "full",
          })}
        </p>
        <img
          src={`/weatherIcons/${weatherData.weather[0].icon}.svg`}
          alt="weather icon"
          width={128}
          height={128}
        />
        <p className="card-text fs-3 mb-2">{weatherData.main.temp} °C</p>
        <p className="card-text fs-4 mb-0">{weatherData.weather[0].main}</p>
        <p className="card-text">{weatherDesResult}</p>
        <div className="row">
          {weatherCardDetails.map((weatherDetail, ind) => (
            <WeatherCardDetail key={ind} weatherCardDetails={weatherDetail} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayWeatherCard;
