import axios from "../utils/apiClient";
import { useEffect, useState } from "react";

const WeatherView = () => {
  const [weather, setWeather] = useState([]);

  const refreshWeather = async () => {
    const {data}  = await axios.get('/api/weather');
    setWeather(data);
  }


  useEffect(() => {
    refreshWeather();
  }, []);

  return (
    <>
      <h1>Weather</h1>
      <div>{weather}</div>
    </>
  )
}

export default WeatherView;