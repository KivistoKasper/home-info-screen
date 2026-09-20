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

    const interval = setInterval(refreshWeather, 1000 * 60 * 30); // refresh every 30 mins 
    return () => clearInterval(interval);
  }, []);
   

  
  return (
    <>
      <h2>Weather</h2>
      <div id="WeatherNow">
        <WeatherNow weather={weather}/>
      </div>
      <div id="weatherDaily">
        <p>Tännään aurinkoo jälleen vaan: {weather?.data?.daily?.daylight?.hours}h ja {weather?.data?.daily?.daylight?.minutes}mins</p>
        <p>Sunrise: {weather?.data?.daily?.sunrise}</p>
        <p>Sunset: {weather?.data?.daily?.sunset}</p>
      </div>
      <WeatherSlide weather={weather}/>
      
    </>
  )
}

export default WeatherView;