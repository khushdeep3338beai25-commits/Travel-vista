import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container py-5 my-5 text-center">
      <div className="card border-0 shadow-lg p-5 mx-auto rounded-4" style={{ maxWidth: '600px', backgroundColor: 'var(--tv-bg-surface)' }}>
        <div className="mb-4">
          <div className="d-inline-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle p-4 mb-3">
            <i className="bi bi-compass-fill display-1"></i>
          </div>
          <span className="badge bg-danger px-3 py-2 rounded-pill d-block mx-auto mb-3" style={{ maxWidth: '120px' }}>
            Error 404
          </span>
          <h2 className="display-6 fw-bold font-heading mb-2" style={{ color: 'var(--tv-text-primary)' }}>
            Oops! Looks like you've wandered off the map.
          </h2>
          <p className="text-muted mb-4">
            The destination page you are looking for might have been moved, renamed, or doesn't exist.
          </p>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/" className="btn btn-tv-primary rounded-pill px-4 py-2 font-weight-bold">
            <i className="bi bi-house-door me-1"></i> Go Home
          </Link>
          <Link to="/destinations" className="btn btn-outline-secondary rounded-pill px-4 py-2 font-weight-bold">
            <i className="bi bi-globe me-1"></i> Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
