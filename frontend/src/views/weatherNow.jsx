import '../css/weatherNow.css'

const WeatherNow = ({ weather }) => {
  if (!weather?.data) return null;
  return (
    <div className="weather-now">
      <div></div>
      <div>
        {weather?.data?.now?.temp}°
      </div>
      <div>Feels {weather?.data?.now?.apparent_temp}°</div>
      <div>💨 {weather?.data?.now?.wind} m/s</div>
      <div>💧 {weather?.data?.now?.humidity}%</div>
      <div>🌧️ {weather?.data?.now?.precipitation_probability}%</div>
    </div>
  );
};

  export default WeatherNow;