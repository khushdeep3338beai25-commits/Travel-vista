import React from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search by country name, capital, currency, language...' }) {
  return (
    <div className="position-relative w-100">
      <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border" style={{ borderColor: 'var(--tv-border)' }}>
        <span className="input-group-text bg-surface border-0 ps-3 text-primary" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
          <i className="bi bi-search fs-5"></i>
        </span>
        <input
          type="text"
          className="form-control border-0 py-3 shadow-none text-body"
          style={{ backgroundColor: 'var(--tv-bg-surface)', color: 'var(--tv-text-primary)' }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            type="button"
            className="btn bg-surface border-0 pe-3 text-muted"
            style={{ backgroundColor: 'var(--tv-bg-surface)' }}
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}
      </div>
    </div>
  );
}
