import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto py-5 border-top" style={{ backgroundColor: 'var(--tv-bg-surface)', borderColor: 'var(--tv-border)' }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-3">
              <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle" style={{ width: '36px', height: '36px' }}>
                <i className="bi bi-compass-fill fs-5"></i>
              </div>
              <span className="fs-4 fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>Travel<span className="text-primary">Vista</span></span>
            </Link>
            <p className="text-muted small mb-3">Explore live country data, weather, maps, currency rates, and build your own travel plans.</p>
            <span className="badge bg-subtle border text-muted">Social profiles not connected</span>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 font-heading" style={{ color: 'var(--tv-text-primary)' }}>Navigation</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li><Link to="/destinations" className="text-decoration-none text-muted">Destinations</Link></li>
              <li><Link to="/favorites" className="text-decoration-none text-muted">Wishlist</Link></li>
              <li><Link to="/planner" className="text-decoration-none text-muted">Trip Planner</Link></li>
              <li><Link to="/compare" className="text-decoration-none text-muted">Compare</Link></li>
              <li><Link to="/ai-assistant" className="text-decoration-none text-warning fw-semibold">AI Assistant</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 font-heading" style={{ color: 'var(--tv-text-primary)' }}>Explore Regions</h6>
            <div className="row g-2 small">
              {['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((region) => (
                <div className="col-6" key={region}>
                  <Link to={`/destinations?region=${region}`} className="text-decoration-none text-muted">{region}</Link>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 font-heading" style={{ color: 'var(--tv-text-primary)' }}>Live Data</h6>
            <p className="text-muted small mb-0">Country information comes from REST Countries. Weather uses Open-Meteo. Currency rates use ExchangeRate-API. Your wishlist and planner remain in your browser.</p>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: 'var(--tv-border)' }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small text-muted gap-2">
          <div>© {new Date().getFullYear()} TravelVista – Explore the World. Built with React + Vite + Bootstrap 5.</div>
          <div className="d-flex gap-3">
            <Link to="/about" className="text-decoration-none text-muted">About Us</Link>
            <Link to="/contact" className="text-decoration-none text-muted">Contact Support</Link>
            <span className="text-muted">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
