import React from 'react';

export function SkeletonCard() {
  return (
    <div className="card tv-card h-100 border-0 shadow-sm">
      <div className="skeleton w-100" style={{ height: '190px' }}></div>
      <div className="card-body p-4 d-flex flex-column gap-3">
        <div className="skeleton w-75 py-3"></div>
        <div className="skeleton w-50 py-2"></div>
        <div className="skeleton w-100 py-4 rounded-3"></div>
        <div className="skeleton w-100 py-3 mt-auto rounded-3"></div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ message = 'Fetching global travel destinations...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5 my-4">
      <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h6 className="fw-semibold text-muted font-heading">{message}</h6>
    </div>
  );
}
