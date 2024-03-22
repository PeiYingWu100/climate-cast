import { WeatherData } from "../../hooks/useWeather";
import styles from "./WeatherCard.module.css";

interface Props {
  weatherData: WeatherData;
  timeOfDay: string | null;
}

const TodayWeatherCard = ({ weatherData, timeOfDay }: Props) => {
  return (
    <div className={`card text-center`}>
      <div
        className={`card-body 
        ${styles["bg" + timeOfDay]} 
        ${timeOfDay === "Day" ? "" : "text-white"}`}
        id="weatherCard"
      >
        <img
          src={`/weatherIcons/cloudy-day-1.svg`}
          alt="weather icon"
          width={256}
          height={256}
        />
        <h5 className="card-title">
          {weatherData.name}, {weatherData.sys.country}
        </h5>
        <p className="card-text">
          Date: {new Date(weatherData.dt * 1000).toLocaleDateString()}
        </p>
        <p className="card-text">Main weather: {weatherData.weather[0].main}</p>
        <p className="card-text">
          Desc:{" "}
          {weatherData.weather[0].description.toLowerCase().replace(" ", "_")}
        </p>
        <p className="card-text">Temperature: {weatherData.main.temp} °C</p>
        <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
        <p className="card-text">Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default TodayWeatherCard;
