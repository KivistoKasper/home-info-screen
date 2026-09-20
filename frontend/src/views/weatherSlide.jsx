import '../css/weatherSlide.css'

const WeatherSlide = ({ weather }) => {
  if (!weather?.data) return null;
  return (
    <div className="weather-slide">
      {Object.entries(weather.data.hourly).map(([time, hourData]) => (
        <div className="weather-card" key={time}>
          <div className="weather-time">
            {time.slice(11, 16)}
          </div>

          <div className="weather-temp">
            {hourData.temp}°
          </div>

          <div>Feels {hourData.apparent_temp}°</div>

          <div>💨 {hourData.wind} m/s</div>
          <div>💧 {hourData.humidity}%</div>
          <div>🌧️ {hourData.precipitation_probability}%</div>
        </div>
      ))}
    </div>
  );
};

  export default WeatherSlide;