import { WeatherData } from "../App";

interface Props {
  weatherData: WeatherData;
}

const TodayWeatherCard = ({ weatherData }: Props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {weatherData.name}, {weatherData.sys.country}
        </h5>
        <p className="card-text">
          Date: {new Date(weatherData.dt * 1000).toLocaleDateString()}
        </p>
        <p className="card-text">Temperature: {weatherData.main.temp} °C</p>
        <p className="card-text">Humidity: {weatherData.main.humidity}%</p>
        <p className="card-text">Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default TodayWeatherCard;
