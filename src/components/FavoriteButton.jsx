import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoriteButton({ country, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  if (!country || !country.cca3) return null;

  const active = isFavorite(country.cca3);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(country);
      }}
      className={`btn rounded-circle d-flex align-items-center justify-content-center p-2 shadow-sm border-0 ${className}`}
      style={{
        width: '38px',
        height: '38px',
        backgroundColor: active ? '#fee2e2' : 'rgba(255, 255, 255, 0.9)',
        color: active ? '#ef4444' : '#64748b',
        transition: 'all 0.2s ease'
      }}
      title={active ? 'Remove from Wishlist' : 'Add to Wishlist'}
      aria-label="Toggle Wishlist"
    >
      <i className={`bi ${active ? 'bi-heart-fill text-danger' : 'bi-heart'} fs-5`}></i>
    </button>
  );
}
