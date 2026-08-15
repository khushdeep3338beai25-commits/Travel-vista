import React from 'react';

export default function FilterBar({
  selectedRegion,
  onRegionChange,
  sortBy,
  onSortChange,
  onReset,
  totalResults
}) {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="card border-0 shadow-sm p-3 mb-4 rounded-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
      <div className="row g-3 align-items-center">
        {/* Region Pills */}
        <div className="col-lg-7 col-md-12">
          <label className="form-label small fw-bold text-muted mb-2 me-2 d-block">
            <i className="bi bi-funnel-fill text-primary me-1"></i> Filter by Region:
          </label>
          <div className="d-flex flex-wrap gap-2">
            {regions.map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => onRegionChange(reg)}
                className={`btn btn-sm rounded-pill font-weight-semibold ${
                  selectedRegion === reg ? 'btn-primary' : 'btn-outline-secondary'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div className="col-lg-3 col-md-6">
          <label className="form-label small fw-bold text-muted mb-2 d-block">
            <i className="bi bi-sort-down text-primary me-1"></i> Sort By:
          </label>
          <select
            className="form-select form-select-sm rounded-3 border-secondary-subtle"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{ backgroundColor: 'var(--tv-bg-surface)', color: 'var(--tv-text-primary)' }}
          >
            <option value="name-asc">Alphabetical (A - Z)</option>
            <option value="name-desc">Alphabetical (Z - A)</option>
            <option value="pop-desc">Population (High - Low)</option>
            <option value="pop-asc">Population (Low - High)</option>
          </select>
        </div>

        {/* Reset & Count */}
        <div className="col-lg-2 col-md-6 d-flex flex-column justify-content-end align-items-lg-end">
          <span className="small text-muted mb-1">
            Found: <strong className="text-primary">{totalResults}</strong> destinations
          </span>
          <button
            type="button"
            onClick={onReset}
            className="btn btn-sm btn-outline-danger w-100 rounded-pill d-flex align-items-center justify-content-center gap-1"
          >
            <i className="bi bi-arrow-counterclockwise"></i> Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
