import axios from "../utils/apiClient";
import { useEffect, useState } from "react";

import WeatherSlide from './weatherSlide'; 
import WeatherNow from "./weatherNow";
import '../css/weather.css'



const WeatherView = () => {
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const refreshWeather = async () => {
      try {
        const {data}  = await axios.get('/weather');
        console.log(data)
        setWeather(data);
      }
      catch (error) {
        console.log('Failed to fetch weather ', error)
      }
    };

    refreshWeather(); // first fetch after loading

    const interval = setInterval(refreshWeather, 1000 * 60 * 15); // refresh every 15 mins 
    return () => clearInterval(interval);
  }, []);
   
  return (
    <div className="weather-root">
      <div className="weather-top">
        <WeatherNow weather={weather} />
      </div>

      <div className="weather-slide-container">
        <WeatherSlide weather={weather} />
      </div>
    </div>
  );

}

export default WeatherView;