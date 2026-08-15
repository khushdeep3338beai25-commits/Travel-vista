import React, { useEffect, useState } from 'react';
import { fetchWeatherByCoords } from '../services/weatherApi';

export default function WeatherCard({ latlng, capitalName }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    setWeather(null);
    fetchWeatherByCoords(latlng?.[0], latlng?.[1], capitalName)
      .then((data) => active && setWeather(data))
      .catch((err) => active && setError(err.message || 'Weather is temporarily unavailable.'))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [latlng, capitalName]);

  if (loading) return <div className="card border-0 shadow-sm p-4 rounded-4"><span className="text-muted small">Loading live weather…</span></div>;
  if (error) return <div className="card border-0 shadow-sm p-4 rounded-4"><div className="alert alert-warning mb-0 small">Live weather unavailable: {error}</div></div>;
  if (!weather) return null;

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
      <div className="card-header border-0 bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-bold">Current Weather – {weather.city}</h6>
        <span className="badge bg-success small">Live · {weather.provider}</span>
      </div>
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <div className="display-5 fw-bold" style={{ color: 'var(--tv-text-primary)' }}>{weather.temp}°C</div>
            <span className="text-muted">{weather.condition}</span>
          </div>
          <div className="text-end small text-muted">
            <div>Feels like: <strong>{weather.feelsLike}°C</strong></div>
            <div>Humidity: <strong>{weather.humidity}%</strong></div>
            <div>Wind: <strong>{weather.windSpeed} km/h</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
