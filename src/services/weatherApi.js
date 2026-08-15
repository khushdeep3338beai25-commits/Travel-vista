import axios from 'axios';

// Open-Meteo is keyless, so weather remains live without exposing a secret in the browser.
export const fetchWeatherByCoords = async (lat, lon, capitalName = 'Capital') => {
  if (!Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) {
    throw new Error('Invalid coordinates for weather lookup.');
  }

  const url = 'https://api.open-meteo.com/v1/forecast';
  const { data } = await axios.get(url, {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code',
      timezone: 'auto'
    },
    timeout: 10000
  });

  const current = data?.current;
  if (!current) throw new Error('Weather provider returned no current conditions.');

  const weatherCode = Number(current.weather_code);
  const condition = weatherCode === 0 ? 'Clear sky'
    : [1, 2, 3].includes(weatherCode) ? 'Partly cloudy'
    : [45, 48].includes(weatherCode) ? 'Foggy'
    : [51, 53, 55, 56, 57].includes(weatherCode) ? 'Drizzle'
    : [61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode) ? 'Rain'
    : [71, 73, 75, 77, 85, 86].includes(weatherCode) ? 'Snow'
    : [95, 96, 99].includes(weatherCode) ? 'Thunderstorm' : 'Current conditions';

  return {
    isLive: true,
    provider: 'Open-Meteo',
    temp: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    condition,
    humidity: Math.round(current.relative_humidity_2m),
    windSpeed: Math.round(current.wind_speed_10m),
    city: capitalName
  };
};
