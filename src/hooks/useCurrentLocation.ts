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

    function fetchWeather(locationQuery: LocationQuery ){
        apiClient
            .get<WeatherData>(
                locationQuery.location ? 
                `/data/2.5/weather?q=${locationQuery.location}&units=metric`:
                `/data/2.5/weather?lat=${locationQuery.lat}&lon=${locationQuery.lon}&units=metric`
            )
            .then((res) => {
                setWeatherCardQuery({
                    data: res.data,
                    error: res.data ? "" : "empty data",
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
            setWeatherCardQuery({
                data: null,
                error: "Unfortunately, your browser doesn't support geolocation. As a fallback, we've set the default location to Sydney.",
                isLoading: false,
            });

            fetchWeather({
                location: "Sydney",
                lat: null,
                lon: null,
            })
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
            setWeatherCardQuery({
                data: null,
                error: `Apologies, we encountered an error while retrieving your location: ${locationErr.message}. As a fallback, we've set the default location to Sydney.`,
                isLoading: false,
            });
           
            fetchWeather({
                location: "Sydney",
                lat: null,
                lon: null,
            })
        }
    }, []);

    return {...weatherCardQuery}
}

export default useCurrentLocation;