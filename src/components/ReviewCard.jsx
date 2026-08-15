import React from 'react';

export default function ReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="card tv-card h-100 border-0 p-4 shadow-sm" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="rounded-circle object-fit-cover shadow-sm"
          width="54"
          height="54"
        />
        <div>
          <h6 className="fw-bold mb-0 font-heading" style={{ color: 'var(--tv-text-primary)' }}>{review.name}</h6>
          <span className="text-muted small">{review.role}</span>
        </div>
      </div>

      <div className="mb-3 text-warning">
        {[...Array(review.rating)].map((_, i) => (
          <i key={i} className="bi bi-star-fill me-1"></i>
        ))}
      </div>

      <p className="text-secondary small fst-italic mb-0">"{review.comment}"</p>
    </div>
  );
}
