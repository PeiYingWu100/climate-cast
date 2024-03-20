import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { WeatherData } from "./useWeather";
import apiClient from "../services/apiClient";
import { LocationQuery } from "../components/SearchBar";

const useCurrentLocation = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    function fetchWeather(locationQuery: LocationQuery ){
        apiClient
            .get<WeatherData>(
                locationQuery.location ? 
                `/data/2.5/weather?q=${locationQuery.location}&units=metric`:
                `/data/2.5/weather?lat=${locationQuery.lat}&lon=${locationQuery.lon}&units=metric`
            )
            .then((res) => {
                setData(res.data);
                if(data) setError("");

                setIsLoading(false)
            })
            .catch((err: Error | AxiosError) => {
                setError(err.message);

                setIsLoading(false)
            });
    }

    useEffect(() => {        
        function success(position: GeolocationPosition){
            const { latitude, longitude } = position.coords;

            fetchWeather({
                location: null,
                lat: latitude,
                lon: longitude,
            })
        }

        function failed(locationErr:GeolocationPositionError){
            setError(`Apologies, we encountered an error while retrieving your location: ${locationErr.message}. As a fallback, we've set the default location to Sydney.`);

            fetchWeather({
                location: "Sydney",
                lat: null,
                lon: null,
            })
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,failed);
        }
        else {
            setError("Unfortunately, your browser doesn't support geolocation. As a fallback, we've set the default location to Sydney.");

            fetchWeather({
                location: "Sydney",
                lat: null,
                lon: null,
            })
        }
    }, []);

    return {data, error, isLoading}
}

export default useCurrentLocation;