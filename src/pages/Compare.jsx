import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { fetchAllCountries } from '../services/countriesApi';
import { formatPopulation, formatCurrencies, formatLanguages, formatCapital, formatTimezones } from '../utils/formatters';

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const [allCountries, setAllCountries] = useState([]);
  const [searchSelect, setSearchSelect] = useState('');

  useEffect(() => {
    fetchAllCountries().then((data) => setAllCountries(data));
  }, []);

  const handleAddSelected = (e) => {
    const code = e.target.value;
    if (!code) return;
    const country = allCountries.find((c) => c.cca3 === code);
    if (country) {
      addToCompare(country);
      setSearchSelect('');
    }
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <span className="badge bg-primary px-3 py-2 rounded-pill mb-2">Side-by-Side Analysis</span>
          <h1 className="display-5 fw-bold font-heading mb-0" style={{ color: 'var(--tv-text-primary)' }}>
            Compare Destinations
          </h1>
          <p className="text-muted small">Compare up to 3 countries across geography, demographics, currencies, and languages.</p>
        </div>

        {compareList.length > 0 && (
          <button onClick={clearCompare} className="btn btn-outline-danger btn-sm rounded-pill">
            <i className="bi bi-trash me-1"></i> Clear Comparison
          </button>
        )}
      </div>

      {/* Selector Box */}
      {compareList.length < 3 && (
        <div className="card border-0 shadow-sm p-4 mb-4 rounded-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
          <div className="row align-items-center g-3">
            <div className="col-md-4">
              <h6 className="fw-bold font-heading mb-0" style={{ color: 'var(--tv-text-primary)' }}>
                <i className="bi bi-plus-circle text-primary me-2"></i> Add Country to Compare ({compareList.length}/3):
              </h6>
            </div>
            <div className="col-md-8">
              <select
                className="form-select"
                value={searchSelect}
                onChange={handleAddSelected}
              >
                <option value="">-- Choose a country to compare --</option>
                {allCountries
                  .filter((c) => !compareList.some((item) => item.cca3 === c.cca3))
                  .map((c) => (
                    <option key={c.cca3} value={c.cca3}>
                      {c.name?.common} ({c.region})
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {compareList.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center rounded-4 my-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
          <i className="bi bi-arrow-left-right display-3 text-primary mb-3"></i>
          <h3 className="fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>No countries selected for comparison</h3>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: '500px' }}>
            Select countries from the dropdown above or click "Add to Compare" on any destination card to analyze parameters side-by-side.
          </p>
          <Link to="/destinations" className="btn btn-tv-primary rounded-pill px-4">
            Browse Destinations
          </Link>
        </div>
      ) : (
        /* Comparison Table */
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" style={{ color: 'var(--tv-text-primary)' }}>
              <thead style={{ backgroundColor: 'var(--tv-bg-subtle)' }}>
                <tr>
                  <th style={{ width: '200px' }} className="p-3">Feature</th>
                  {compareList.map((c) => (
                    <th key={c.cca3} className="p-3 text-center" style={{ minWidth: '220px' }}>
                      <div className="d-flex flex-column align-items-center gap-2">
                        <img
                          src={c.flags?.svg || c.flags?.png}
                          alt={c.name?.common}
                          className="rounded shadow-sm object-fit-cover"
                          width="80"
                          height="50"
                        />
                        <span className="fw-bold font-heading fs-5">{c.name?.common}</span>
                        <div className="d-flex gap-2">
                          <Link to={`/destination/${c.cca3}`} className="btn btn-sm btn-tv-primary py-1 px-2">
                            View Details
                          </Link>
                          <button
                            onClick={() => removeFromCompare(c.cca3)}
                            className="btn btn-sm btn-outline-danger py-1 px-2"
                            title="Remove"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="bg-subtle">Capital</th>
                  {compareList.map((c) => (
                    <td key={c.cca3} className="text-center font-weight-semibold">{formatCapital(c.capital)}</td>
                  ))}
                </tr>
                <tr>
                  <th className="bg-subtle">Region / Subregion</th>
                  {compareList.map((c) => (
                    <td key={c.cca3} className="text-center">
                      <span className="badge bg-primary me-1">{c.region}</span>
                      <span className="small text-muted">{c.subregion}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className="bg-subtle">Population</th>
                  {compareList.map((c) => (
                    <td key={c.cca3} className="text-center fw-bold">{formatPopulation(c.population)}</td>
                  ))}
                </tr>
                <tr>
                  <th className="bg-subtle">Currencies</th>
                  {compareList.map((c) => (
                    <td key={c.cca3} className="text-center small">{formatCurrencies(c.currencies)}</td>
                  ))}
                </tr>
                <tr>
                  <th className="bg-subtle">Languages</th>
                  {compareList.map((c) => (
                    <td key={c.cca3} className="text-center small">{formatLanguages(c.languages)}</td>
                  ))}
                </tr>
                <tr>
                  <th className="bg-subtle">Time Zones</th>
                  {compareList.map((c) => (
                    <td key={c.cca3} className="text-center small">{formatTimezones(c.timezones)}</td>
                  ))}
                </tr>
                <tr>
                  <th className="bg-subtle">Neighboring Borders</th>
                  {compareList.map((c) => (
                    <td key={c.cca3} className="text-center">
                      {c.borders && c.borders.length > 0 ? (
                        <span className="badge bg-success">{c.borders.length} Border Countries</span>
                      ) : (
                        <span className="badge bg-secondary">Island / None</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
