import "./App.css";
import WeatherCard from "./components/WeatherCard";
import useWeather from "./hooks/useWeather";

function App() {
  const { weatherData, error } = useWeather();

  return (
    <div className="container mt-5">
      {error && <p className="fw-bold text-danger">Sorry! {error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;
