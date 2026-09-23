import axios from "./utils/apiClient";
import { useEffect, useState } from "react";

import './css/App.css'

import WeatherNow from "./views/weatherNow";
import WeatherSlide from './views/weatherSlide'; 
import TimeDateView from './views/timeDate';
import NysseView from './views/nysse';

function App() {

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
    <div className='App'>
      <TimeDateView />

      <div className="dashboard-row">
        <div className="weather-container">
          <WeatherNow weather={weather} />
        </div>

        <div className="nysse-container">
          <NysseView />
        </div>
      </div>

      <div className="weather-slide-container">
        <WeatherSlide weather={weather} />
      </div>
    </div>
  )
}

export default App
