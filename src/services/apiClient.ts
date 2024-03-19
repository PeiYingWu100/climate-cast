import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL:"https://api.openweathermap.org/",
    params: {
        // This is an API Key
        appid: import.meta.env.VITE_API_KEY
      }
})

export { CanceledError }