import { useState } from "react";
import useWeather from "./useWeather";
import { FetchWeatherQuery } from "../App";

export interface LocationQuery {
    location: string | null;
    lat: number | null;
    lon: number | null;
  }

const useCurrentLocation = () => {
    const [FetchWeatherQuery, setFetchWeatherQuery] = useState<FetchWeatherQuery>(
        {} as FetchWeatherQuery
    );

    const [locationQuery, setLocationQuery] = useState<LocationQuery>(
        {} as LocationQuery
    );

    const [errorMsg, setErrorMsg] = useState("");
     
    // Get Local Location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success,failed);
    }
    else {
        setLocationQuery({
            location: "Sydney",
            lat: null,
            lon: null,
        });
        setErrorMsg("Unfortunately, your browser doesn't support geolocation. As a fallback, we've set the default location to Sydney.");
    }

    function success(position: GeolocationPosition){
        const { latitude, longitude } = position.coords;

        setLocationQuery({
            location: null,
            lat: latitude,
            lon: longitude,
        });
        setErrorMsg("");
    }

    function failed(locationErr:GeolocationPositionError){
        setLocationQuery({
            location: "Sydney",
            lat: null,
            lon: null,
        });
        setErrorMsg(`Apologies, we encountered an error while retrieving your location: ${locationErr.message}. As a fallback, we've set the default location to Sydney.`)
    }

    useWeather(locationQuery, setFetchWeatherQuery, errorMsg, [locationQuery.location, errorMsg]);

    return {...FetchWeatherQuery}
}

export default useCurrentLocation;