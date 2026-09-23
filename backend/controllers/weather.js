const weatherRouter = require('express').Router();
const { request } = require('express');
const {MemoryCache, NodeFetchCache} = require('node-fetch-cache');
const {DateTime} = require('luxon');

const logger = require('../utils/logger');

const createTimeTable = () => {
  const now = DateTime.now().setZone('Europe/Helsinki');

  const times = [6, 12, 18, 24];

  const timeTable = times
    .map(hour => {
      // 24 means midnight at the END of the current day
      const dateTime = now.startOf('day').plus({ hours: hour });

      // If the time has already passed, move it to tomorrow
      return dateTime <= now
        ? dateTime.plus({ days: 1 })
        : dateTime;
    })
    .sort((a, b) => a.toMillis() - b.toMillis())
    .map(dateTime =>
      dateTime.toFormat("yyyy-MM-dd'T'HH:mm")
    );

  //console.log(timeTable);
  return timeTable;
};

/**
 * Set Fetch with cache
 */
const fetch = NodeFetchCache.create({
  // Only cache responses with a 2xx status code
  shouldCacheResponse: (response) => response.ok,
  cache: new MemoryCache({ttl: 1000 * 60 * 15}), // 15 minutes
});



weatherRouter.get('/', async (req, res) => {
  // old url for only hourly data
  //const url = 'https://api.open-meteo.com/v1/forecast?latitude=61.4479&longitude=23.853&daily=sunrise%2Csunset&hourly=temperature_2m%2Cweather_code%2Cprecipitation%2Cwind_speed_10m%2Crelative_humidity_2m%2Capparent_temperature%2Cprecipitation_probability%2Cwind_gusts_10m&timezone=auto&forecast_days=3&wind_speed_unit=ms';

  // new url for hourly, daily and current data
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=61.4479&longitude=23.853&daily=sunrise,sunset&hourly=temperature_2m,weather_code,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation_probability,wind_gusts_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_gusts_10m,precipitation,weather_code&timezone=auto&forecast_days=3&wind_speed_unit=ms'
  const options = {
    method: 'GET',
    Headers: {
      'Cache-Control': 'only-if-cached',
    }
  };

  const orderedTimes = createTimeTable();

  // add data here
  const weatherData = {
    data: {
      hourly: {},
      daily: {},
      now: {}
    }

  }
  
  try {
    const response = await fetch(url, options)

    if (response.returnedFromCache) {
      logger.info('---Response was found in the cache!');
    }
    const data = await response.json();
    //console.log(data.hourly.temperature_2m[0])

    /**
     * Hourly data for weather slide
     */
    orderedTimes.forEach( time => {
      weatherData.data.hourly[time] = {
        temp: data.hourly.temperature_2m[data.hourly.time.indexOf(time)],
        wind: data.hourly.wind_speed_10m[data.hourly.time.indexOf(time)],
        humidity: data.hourly.relative_humidity_2m[data.hourly.time.indexOf(time)],
        apparent_temp: data.hourly.apparent_temperature[data.hourly.time.indexOf(time)],
        precipitation: data.hourly.precipitation[data.hourly.time.indexOf(time)],
        precipitation_probability: data.hourly.precipitation_probability[data.hourly.time.indexOf(time)],
        wind_gusts: data.hourly.wind_gusts_10m[data.hourly.time.indexOf(time)],
      }
    })

    /**
     * Daily data 
     */
    const sunrise = DateTime.fromISO(data.daily.sunrise[0]).setZone('Europe/Helsinki');
    const sunset = DateTime.fromISO(data.daily.sunset[0]).setZone('Europe/Helsinki');
    const daylight = sunset.diff(sunrise, ['hours', 'minutes']).toObject();

    weatherData.data.daily = {
      sunrise: data.daily.sunrise[0].substring(11, 16),
      sunset: data.daily.sunset[0].substring(11, 16),
      daylight: daylight
    }


    /**
     * Current data
     */
    weatherData.data.now = {
      temp: data.current.temperature_2m,
      wind: data.current.wind_speed_10m,
      gusts: data.current.wind_gusts_10m,
      humidity: data.current.relative_humidity_2m,
      apparent_temp: data.current.apparent_temperature,
      precipitation: data.current.precipitation,
    }

    //console.log(weatherData);
    res.json(weatherData);
  }
  catch (error) {
    logger.error(error);
    res.statusCode(500).json('Data fetching error');
  }
})


module.exports = weatherRouter