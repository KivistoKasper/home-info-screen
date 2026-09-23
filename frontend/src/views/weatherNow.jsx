import '../css/weatherNow.css';

const WeatherNow = ({ weather }) => {
  const now = weather?.data?.now;
  const daily = weather?.data?.daily;

  if (!now) return null;
  if (!daily) return null;

  return (
    <div className="weather-now">
      <div className="weather-now-main">
        <div className="weather-now-temp">
          {now.temp}°
        </div>

        <div className="weather-now-feels">
          Feels like {now.apparent_temp}°
          <p>
            daylight {daily.daylight?.hours} h {daily.daylight?.minutes} min
          </p>
        </div>

        
      </div>

      <div className="weather-now-details">
        <div className="weather-now-detail">
          <span className="weather-now-icon">💨</span>
          <div>
            <span className="weather-now-label">Wind</span>
            <strong>{now.wind} m/s</strong>
          </div>
        </div>

        <div className="weather-now-detail">
          <span className="weather-now-icon">💨</span>
          <div>
            <span className="weather-now-label">Gusts</span>
            <strong>{now.gusts} m/s</strong>
          </div>
        </div>

        <div className="weather-now-detail">
          <span className="weather-now-icon">🌧️</span>
          <div>
            <span className="weather-now-label">Precipitation</span>
            <strong>{now.precipitation} mm</strong>
          </div>
        </div>

        <div className="weather-now-detail">
          <span className="weather-now-icon">💧</span>
          <div>
            <span className="weather-now-label">Humidity</span>
            <strong>{now.humidity}%</strong>
          </div>
        </div>

        <div className="weather-now-detail">
          <span className="weather-now-icon">🌅</span>
          <div>
            <span className="weather-now-label">Sunrise</span>
            <strong>{daily.sunrise}</strong>
          </div>
        </div>

        <div className="weather-now-detail">
          <span className="weather-now-icon">🌇</span>
          <div>
            <span className="weather-now-label">Sunset</span>
            <strong>{daily.sunset}</strong>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherNow;