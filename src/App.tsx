import "./App.css";
import WeatherCard from "./components/WeatherCard";
import useWeather from "./hooks/useWeather";

function App() {
  const { weatherData, error, isLoading } = useWeather();

  return (
    <div className="container mt-5">
      {error && <p className="fw-bold text-danger">Sorry! {error}</p>}
      {isLoading && (
        <div className="text-center">
          <p>Loading your current location...</p>
          <div className="spinner-border"></div>
        </div>
      )}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}

export default App;
