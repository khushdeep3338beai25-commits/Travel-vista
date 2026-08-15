import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Hero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/destinations');
    }
  };

  return (
    <section className="hero-wrapper mb-5">
      <div className="container text-center py-4 py-md-5">
        <span className="badge rounded-pill bg-light text-primary px-3 py-2 fw-semibold mb-3 shadow-sm">
          <i className="bi bi-airplane-fill me-2"></i> Your Global Travel Gateway
        </span>
        <h1 className="display-4 fw-bold font-heading mb-3" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          Explore the World, One Destination at a Time.
        </h1>
        <p className="lead mx-auto mb-4 opacity-90" style={{ maxWidth: '750px' }}>
          Discover amazing countries, vibrant cultures, breathtaking landscapes, real-time weather metrics, and smart AI itineraries for your next unforgettable journey.
        </p>

        {/* Quick Search Bar */}
        <div className="mx-auto hero-search-box mb-4" style={{ maxWidth: '680px' }}>
          <form onSubmit={handleSearch} className="row g-2 align-items-center">
            <div className="col-12 col-md-8">
              <div className="input-group">
                <span className="input-group-text bg-white border-0 text-muted">
                  <i className="bi bi-search fs-5"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-2 fs-6"
                  placeholder="Where do you want to go? (e.g. France, Tokyo, Europe)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <button type="submit" className="btn btn-warning w-100 py-2 fw-bold text-dark d-flex align-items-center justify-content-center gap-2 shadow">
                <i className="bi bi-compass"></i> Search Places
              </button>
            </div>
          </form>
        </div>

        {/* CTA Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/destinations" className="btn btn-tv-primary px-4 py-2 fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-grid-fill"></i> Explore Destinations
          </Link>
          <Link to="/planner" className="btn btn-outline-light px-4 py-2 fw-bold d-flex align-items-center gap-2">
            <i className="bi bi-calendar-check"></i> Plan Your Trip
          </Link>
          <Link to="/ai-assistant" className="btn btn-warning px-4 py-2 fw-bold text-dark d-flex align-items-center gap-2">
            <i className="bi bi-stars"></i> AI Assistant
          </Link>
        </div>
      </div>
    </section>
  );
}
