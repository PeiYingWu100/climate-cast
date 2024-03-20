import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { WeatherData } from "./useWeather";
import apiClient from "../services/apiClient";
import { LocationQuery } from "../components/SearchBar";
import { WeatherCardQuery } from "../App";

const useCurrentLocation = () => {
    const [weatherCardQuery, setWeatherCardQuery] = useState<WeatherCardQuery>(
        {} as WeatherCardQuery
    );

    function fetchWeather(locationQuery: LocationQuery, errMessage = "" ){
        apiClient
            .get<WeatherData>(
                locationQuery.location ? 
                `/data/2.5/weather?q=${locationQuery.location}&units=metric`:
                `/data/2.5/weather?lat=${locationQuery.lat}&lon=${locationQuery.lon}&units=metric`
            )
            .then((res) => {
                setWeatherCardQuery({
                    data: res.data,
                    error: res.data && errMessage === "" ? "" : errMessage,
                    isLoading: false,
                });
            })
            .catch((err: Error | AxiosError) => {
                setWeatherCardQuery({
                    data: null,
                    error: err.message,
                    isLoading: false,
                });
            });
    }

    useEffect(() => {        
        setWeatherCardQuery({
            data: null,
            error: "",
            isLoading: true,
          });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,failed);
        }
        else {
            fetchWeather({
                location: "Sydney",
                lat: null,
                lon: null,
            }, "Unfortunately, your browser doesn't support geolocation. As a fallback, we've set the default location to Sydney.")
        }

        function success(position: GeolocationPosition){
            const { latitude, longitude } = position.coords;

            fetchWeather({
                location: null,
                lat: latitude,
                lon: longitude,
            })
        }

        function failed(locationErr:GeolocationPositionError){
            fetchWeather({
                location: "Sydney",
                lat: null,
                lon: null,
            }, `Apologies, we encountered an error while retrieving your location: ${locationErr.message}. As a fallback, we've set the default location to Sydney.`)
        }
    }, []);

    return {...weatherCardQuery}
}

export default useCurrentLocation;