
import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "../services/apiClient";
import { AxiosError } from "axios";
import { FetchDataQuery } from "../App";

export interface CityData {
    name: string;
    country: string;
    state: string;
    lat: number;
    lon: number;
}

interface FetchCityQuery extends FetchDataQuery{
    data: CityData[] | null;
}

const useCity = (city:string | null, deps?: any[]) => {
    const [FetchCityQuery, setFetchCityQuery] = useState<FetchCityQuery>(
        {} as FetchCityQuery
    );

  useEffect(() => {
      const controller = new AbortController();

      if (!city ) return;

      apiClient
        .get<CityData[]>("/geo/1.0/direct", {
          params: {
            q: city,
            limit: 5,
          },
        })
        .then((res) => {
            setFetchCityQuery({
                data: res.data,
                error: "",
                isLoading: false,
            })
        })
        .catch((err: Error | AxiosError) => {
            if(err instanceof CanceledError) return;
            
            console.log(err);
        });
          // .finally(() => setIsLoading(false));

          return () => controller.abort();
  }, deps ? [...deps] : []);

  return {...FetchCityQuery};
}

export default useCity;