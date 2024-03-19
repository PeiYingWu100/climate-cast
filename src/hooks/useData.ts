import { useEffect, useState } from "react";
import { AxiosError, AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../services/apiClient";

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig) =>{
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        const controller = new AbortController();

        setIsLoading(true);
        apiClient
            .get<T>(endpoint, { signal: controller.signal, ...requestConfig })
            .then((res) => {
                setData(res.data);
                if(data) setError("");
                setIsLoading(false)
            })
            .catch((err: Error | AxiosError) => {
                if(err instanceof CanceledError) return;

                setError(err.message);
                setIsLoading(false)
            })
            // .finally(() => setIsLoading(false));

            return () => controller.abort();
    }, []);

    return {data, error, isLoading}
}

export default useData;