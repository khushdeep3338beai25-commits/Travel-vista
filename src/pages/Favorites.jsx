import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import DestinationCard from '../components/DestinationCard';

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <span className="badge bg-danger px-3 py-2 rounded-pill mb-2">My Wishlist</span>
          <h1 className="display-5 fw-bold font-heading mb-0" style={{ color: 'var(--tv-text-primary)' }}>
            Saved Destinations
          </h1>
          <p className="text-muted small">Your personal bookmark list stored locally in your browser.</p>
        </div>

        {favorites.length > 0 && (
          <span className="badge bg-primary fs-6 px-3 py-2 rounded-pill">
            <i className="bi bi-heart-fill me-1 text-danger"></i> {favorites.length} Saved Places
          </span>
        )}
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center rounded-4 my-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
          <div className="py-4">
            <div className="d-flex align-items-center justify-content-center bg-danger-subtle text-danger rounded-circle mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-heartbreak-fill display-4"></i>
            </div>
            <h3 className="fw-bold font-heading mb-2" style={{ color: 'var(--tv-text-primary)' }}>
              Your travel wishlist is empty.
            </h3>
            <p className="text-muted mx-auto mb-4" style={{ maxWidth: '500px' }}>
              Explore destinations across the globe and click the heart icon to save your favorite countries for quick access later.
            </p>
            <Link to="/destinations" className="btn btn-tv-primary rounded-pill px-4 py-2 font-weight-bold">
              <i className="bi bi-compass me-1"></i> Explore Destinations
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {favorites.map((country) => (
            <div key={country.cca3} className="col-lg-4 col-md-6">
              <DestinationCard country={country} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
