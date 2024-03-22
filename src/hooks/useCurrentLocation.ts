import { useState } from "react";
import useWeather from "./useWeather";
import { FetchDataQuery } from "../App";

export interface LocationQuery {
    location: string | null;
    lat: number | null;
    lon: number | null;
  }

const useCurrentLocation = () => {
    const [FetchDataQuery, setFetchDataQuery] = useState<FetchDataQuery>(
        {} as FetchDataQuery
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

    useWeather(locationQuery, setFetchDataQuery, errorMsg, [locationQuery.location, errorMsg]);

    return {...FetchDataQuery}
}

export default useCurrentLocation;