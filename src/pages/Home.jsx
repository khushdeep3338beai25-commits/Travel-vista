import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import { fetchAllCountries } from '../services/countriesApi';
import { SkeletonCard } from '../components/SkeletonCard';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllCountries()
      .then((data) => setCountries(data))
      .catch((err) => setError(err.message || 'Live destination data is unavailable.'))
      .finally(() => setLoading(false));
  }, []);

  const sortedByPopulation = [...countries].sort((a, b) => (b.population || 0) - (a.population || 0));
  const popularCountries = sortedByPopulation.slice(0, 6);
  const moreCountries = sortedByPopulation.slice(6, 12);
  const regionCounts = countries.reduce((acc, country) => { acc[country.region] = (acc[country.region] || 0) + 1; return acc; }, {});

  const regions = [
    { name: 'Europe', count: `${regionCounts.Europe || 0} Countries`, img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=500&q=80' },
    { name: 'Asia', count: `${regionCounts.Asia || 0} Countries`, img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=500&q=80' },
    { name: 'Americas', count: `${regionCounts.Americas || 0} Countries`, img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=500&q=80' },
    { name: 'Africa', count: `${regionCounts.Africa || 0} Countries`, img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=500&q=80' },
    { name: 'Oceania', count: `${regionCounts.Oceania || 0} Countries`, img: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=500&q=80' }
  ];

  return (
    <div>
      {/* Hero Banner Section */}
      <Hero />

      <div className="container py-4">
        {/* Most Populous Destinations */}
        <section className="mb-5">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-4">
            <div>
              <span className="text-primary font-weight-bold text-uppercase small tracking-wider">Top Rated</span>
              <h2 className="display-6 fw-bold font-heading mb-0" style={{ color: 'var(--tv-text-primary)' }}>
                Popular Destinations
              </h2>
            </div>
            <Link to="/destinations" className="btn btn-tv-outline btn-sm">
              View All Destinations <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          {error && !loading && (
            <div className="alert alert-warning d-flex align-items-center gap-2 mb-4" role="alert">
              <i className="bi bi-exclamation-triangle"></i>
              <span>{error}</span>
            </div>
          )}

          <div className="row g-4">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="col-lg-4 col-md-6">
                    <SkeletonCard />
                  </div>
                ))
              : popularCountries.map((c) => (
                  <div key={c.cca3} className="col-lg-4 col-md-6">
                    <DestinationCard country={c} />
                  </div>
                ))}
          </div>
        </section>

        {/* Explore by Region */}
        <section className="mb-5 py-4">
          <div className="text-center mb-4">
            <span className="text-primary font-weight-bold text-uppercase small tracking-wider">Continents</span>
            <h2 className="display-6 fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>
              Explore by Region
            </h2>
            <p className="text-muted">Discover unique cultures and landscapes across five continents</p>
          </div>

          <div className="row g-3">
            {regions.map((reg) => (
              <div key={reg.name} className="col-lg-4 col-md-6">
                <Link
                  to={`/destinations?region=${reg.name}`}
                  className="card border-0 rounded-4 overflow-hidden text-white shadow-sm text-decoration-none transition-transform"
                  style={{ height: '200px' }}
                >
                  <img
                    src={reg.img}
                    alt={reg.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="card-img-overlay d-flex flex-column justify-content-end p-4 bg-dark bg-opacity-50">
                    <h4 className="fw-bold font-heading mb-0">{reg.name}</h4>
                    <span className="small text-light">{reg.count}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Destinations */}
        <section className="mb-5">
          <div className="d-flex flex-wrap align-items-end justify-content-between mb-4">
            <div>
              <span className="text-warning font-weight-bold text-uppercase small tracking-wider">🌍 Explore More</span>
              <h2 className="display-6 fw-bold font-heading mb-0" style={{ color: 'var(--tv-text-primary)' }}>
                More Destinations
              </h2>
            </div>
            <Link to="/destinations" className="btn btn-tv-outline btn-sm">
              Explore More <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <div className="row g-4">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div key={i} className="col-lg-4 col-md-6">
                    <SkeletonCard />
                  </div>
                ))
              : moreCountries.map((c) => (
                  <div key={c.cca3} className="col-lg-4 col-md-6">
                    <DestinationCard country={c} />
                  </div>
                ))}
          </div>
        </section>

        {/* Why Choose TravelVista */}
        <section className="my-5 p-5 rounded-4 shadow-sm" style={{ backgroundColor: 'var(--tv-bg-surface)', border: '1px solid var(--tv-border)' }}>
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">Why TravelVista</span>
              <h2 className="display-6 fw-bold font-heading mb-3" style={{ color: 'var(--tv-text-primary)' }}>
                Your Ultimate Travel Companion & Planner
              </h2>
              <p className="text-muted mb-4">
                TravelVista combines verified real-world country data, live weather insights, automated currency exchange calculations, and Gemini AI itinerary planning in one seamless modern app.
              </p>

              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-shield-check fs-2 text-primary"></i>
                    <div>
                      <h6 className="fw-bold mb-1 font-heading" style={{ color: 'var(--tv-text-primary)' }}>Live Country Data</h6>
                      <p className="text-muted small mb-0">Official demographics, currencies & border insights.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-stars fs-2 text-warning"></i>
                    <div>
                      <h6 className="fw-bold mb-1 font-heading" style={{ color: 'var(--tv-text-primary)' }}>AI Assistant</h6>
                      <p className="text-muted small mb-0">Custom day-by-day trip recommendations.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-map fs-2 text-success"></i>
                    <div>
                      <h6 className="fw-bold mb-1 font-heading" style={{ color: 'var(--tv-text-primary)' }}>Interactive Maps</h6>
                      <p className="text-muted small mb-0">OpenStreetMap integration with Leaflet markers.</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-start gap-3">
                    <i className="bi bi-heart-pulse fs-2 text-danger"></i>
                    <div>
                      <h6 className="fw-bold mb-1 font-heading" style={{ color: 'var(--tv-text-primary)' }}>Trip Wishlist</h6>
                      <p className="text-muted small mb-0">Save favorites locally across your browser session.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80"
                alt="Travel Explorer"
                className="w-100 rounded-4 shadow-lg object-fit-cover"
                style={{ maxHeight: '420px' }}
              />
            </div>
          </div>
        </section>

        {/* Live data summary */}
        <section className="my-5 py-5 text-center bg-primary text-white rounded-4 shadow-md">
          <div className="row g-4">
            <div className="col-md-3 col-6"><div className="display-5 fw-bold font-heading">{countries.length || '—'}</div><span className="opacity-75">Live Countries Loaded</span></div>
            <div className="col-md-3 col-6"><div className="display-5 fw-bold font-heading">REST</div><span className="opacity-75">Country Data Source</span></div>
            <div className="col-md-3 col-6"><div className="display-5 fw-bold font-heading">OSM</div><span className="opacity-75">Interactive Maps</span></div>
            <div className="col-md-3 col-6"><div className="display-5 fw-bold font-heading">Local</div><span className="opacity-75">Planner & Wishlist Storage</span></div>
          </div>
        </section>


      </div>
    </div>
  );
}
