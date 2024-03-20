import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { WeatherData } from "./useWeather";
import apiClient from "../services/apiClient";

const useCurrentLocation = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        
        function success(position: GeolocationPosition){
            const { latitude, longitude } = position.coords;

            apiClient
                .get<WeatherData>(
                    `/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`
                )
                .then((res) => {
                    setData(res.data);
                    if(data) setError("");
                    setIsLoading(false)
                })
                .catch((err: Error | AxiosError) => {
                    setError(err.message);
                });
        }

        function failed(locationErr:GeolocationPositionError){
            setError(`Error getting user location: ${locationErr}`);
            setIsLoading(false)
            console.log("geo error");
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success,failed);
            console.log("check geo");
        }
        else {
            setError('Geolocation is not supported by this browser.');
            console.log("browser not support");
        }
    }, []);

    return {data, error, isLoading}
}

export default useCurrentLocation;