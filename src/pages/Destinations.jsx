import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllCountries } from '../services/countriesApi';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { SkeletonCard } from '../components/SkeletonCard';

const ITEMS_PER_PAGE = 12;

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchQuery = searchParams.get('search') || '';
  const selectedRegion = searchParams.get('region') || 'All';
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      setCountries(await fetchAllCountries());
    } catch (err) {
      setError(err.message || 'Failed to load live destinations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedRegion, sortBy]);

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return countries
      .filter((country) => {
        if (selectedRegion !== 'All' && country.region !== selectedRegion) return false;
        if (!q) return true;

        const values = [
          country.name?.common,
          country.name?.official,
          country.cca2,
          country.cca3,
          country.capital?.join(' '),
          country.region,
          country.subregion,
          ...(country.currencies ? Object.keys(country.currencies) : []),
          ...(country.currencies ? Object.values(country.currencies).flatMap((c) => [c.name, c.symbol]) : []),
          ...(country.languages ? Object.values(country.languages) : [])
        ].filter(Boolean).join(' ').toLowerCase();
        return values.includes(q);
      })
      .sort((a, b) => {
        if (sortBy === 'name-desc') return (b.name?.common || '').localeCompare(a.name?.common || '');
        if (sortBy === 'pop-desc') return (b.population || 0) - (a.population || 0);
        if (sortBy === 'pop-asc') return (a.population || 0) - (b.population || 0);
        return (a.name?.common || '').localeCompare(b.name?.common || '');
      });
  }, [countries, searchQuery, selectedRegion, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCountries.length / ITEMS_PER_PAGE));
  const displayedCountries = filteredCountries.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'All') next.delete(key);
      else next.set(key, value);
    });
    setSearchParams(next);
  };

  const handleReset = () => {
    setSearchParams({});
    setSortBy('name-asc');
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <span className="badge bg-primary px-3 py-2 rounded-pill">Live REST Countries Data</span>
        <h1 className="display-5 fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>Explore World Destinations</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '650px' }}>Search live country data by name, capital, region, subregion, currency, language, or country code.</p>
      </div>

      <div className="mb-4 mx-auto" style={{ maxWidth: '750px' }}>
        <SearchBar value={searchQuery} onChange={(val) => updateParams({ search: val })} />
      </div>

      <FilterBar
        selectedRegion={selectedRegion}
        onRegionChange={(reg) => updateParams({ region: reg })}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onReset={handleReset}
        totalResults={filteredCountries.length}
      />

      {loading && <div className="row g-4 mb-4">{Array.from({ length: ITEMS_PER_PAGE }, (_, i) => <div key={i} className="col-lg-4 col-md-6"><SkeletonCard /></div>)}</div>}

      {!loading && error && (
        <div className="alert alert-danger p-4 text-center rounded-4 shadow-sm my-4">
          <h5 className="fw-bold">Live destination data could not be loaded</h5>
          <p className="mb-2">{error}</p>
          <button className="btn btn-danger rounded-pill px-4" onClick={loadData}>Retry</button>
        </div>
      )}

      {!loading && !error && filteredCountries.length === 0 && (
        <div className="text-center py-5 my-4 rounded-4 shadow-sm" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
          <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
          <h4 className="fw-bold" style={{ color: 'var(--tv-text-primary)' }}>No destinations found</h4>
          <p className="text-muted">Try a country name, capital, currency code, language, or clear the filters.</p>
          <button className="btn btn-tv-primary rounded-pill px-4" onClick={handleReset}>Clear Filters</button>
        </div>
      )}

      {!loading && !error && displayedCountries.length > 0 && <>
        <div className="row g-4 mb-4">
          {displayedCountries.map((country) => <div key={country.cca3} className="col-lg-4 col-md-6"><DestinationCard country={country} /></div>)}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => { setCurrentPage(page); window.scrollTo({ top: 300, behavior: 'smooth' }); }} />
      </>}
    </div>
  );
}
