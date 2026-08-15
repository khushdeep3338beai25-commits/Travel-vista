import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchCountryByCode, fetchCountriesByCodes } from '../services/countriesApi';
import WeatherCard from '../components/WeatherCard';
import MapComponent from '../components/MapComponent';
import FavoriteButton from '../components/FavoriteButton';
import AITravelAssistant from '../components/AITravelAssistant';
import { formatPopulation, formatCurrencies, formatLanguages, formatCapital, formatTimezones } from '../utils/formatters';
import { COUNTRY_EXTRA_INFO } from '../utils/travelGuideData';
import { useCompare } from '../context/CompareContext';
import { usePlanner } from '../context/PlannerContext';
import { LoadingSpinner } from '../components/SkeletonCard';

export default function DestinationDetails() {
  const { countryCode } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isComparing, addToCompare, removeFromCompare } = useCompare();
  const { addTrip } = usePlanner();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchCountryByCode(countryCode)
      .then((data) => {
        if (!isMounted) return;
        setCountry(data);
        if (data?.borders?.length) {
          return fetchCountriesByCodes(data.borders).then((borderData) => {
            if (isMounted) setBorders(borderData);
          });
        }
        setBorders([]);
      })
      .catch((error) => {
        console.error('Failed to load destination details:', error);
        if (isMounted) {
          setCountry(null);
          setBorders([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [countryCode]);

  if (loading) {
    return (
      <div className="container py-5">
        <LoadingSpinner message="Loading destination details & interactive map..." />
      </div>
    );
  }

  if (!country) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning p-5 rounded-4 shadow-sm">
          <i className="bi bi-geo-alt-fill display-4 text-warning mb-3 d-block"></i>
          <h3 className="fw-bold font-heading">Destination Not Found</h3>
          <p className="text-muted">We couldn't locate country information for code "{countryCode}".</p>
          <Link to="/destinations" className="btn btn-tv-primary rounded-pill px-4">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  const commonName = country.name?.common || 'Destination';
  const officialName = country.name?.official || commonName;
  const capital = formatCapital(country.capital);
  const region = country.region || 'World';
  const subregion = country.subregion || 'N/A';
  const population = formatPopulation(country.population);
  const currency = formatCurrencies(country.currencies);
  const languages = formatLanguages(country.languages);
  const timezones = formatTimezones(country.timezones);
  const latlng = country.latlng || [0, 0];
  const code = country.cca3;

  const comparing = isComparing(code);
  const extraInfo = COUNTRY_EXTRA_INFO[code] || COUNTRY_EXTRA_INFO.DEFAULT;

  const handleStartPlanner = () => {
    addTrip({
      title: `Trip to ${commonName}`,
      destination: commonName,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
      travelers: 2,
      notes: `Exploring ${capital} and surrounding attractions.`
    });
    navigate('/planner');
  };

  return (
    <div className="container py-4">
      {/* Top Breadcrumb / Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center gap-1" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back to Explorer
        </button>

        <div className="d-flex gap-2">
          <FavoriteButton country={country} />
          <button
            onClick={() => (comparing ? removeFromCompare(code) : addToCompare(country))}
            className={`btn btn-sm rounded-pill font-weight-bold ${comparing ? 'btn-danger' : 'btn-outline-primary'}`}
          >
            <i className={`bi ${comparing ? 'bi-check-circle-fill' : 'bi-plus-circle'} me-1`}></i>
            {comparing ? 'In Compare' : 'Add to Compare'}
          </button>
        </div>
      </div>

      {/* Main Destination Hero Header */}
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
        <div className="row g-0">
          <div className="col-lg-5 position-relative bg-dark" style={{ minHeight: '300px' }}>
            <img
              src={country.flags?.svg || country.flags?.png}
              alt={country.flags?.alt || `Flag of ${commonName}`}
              className="w-100 h-100 object-fit-cover opacity-90"
            />
            <div className="position-absolute top-0 start-0 m-3">
              <span className="badge bg-primary px-3 py-2 rounded-pill fs-6 shadow">{code}</span>
            </div>
          </div>
          <div className="col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-center">
            <span className="text-primary font-weight-bold text-uppercase small tracking-wider mb-1">{region} • {subregion}</span>
            <h1 className="display-4 fw-bold font-heading mb-1" style={{ color: 'var(--tv-text-primary)' }}>
              {commonName}
            </h1>
            <p className="text-muted mb-4 fs-6">{officialName}</p>

            {/* Core Specs Grid */}
            <div className="row g-3 small mb-4">
              <div className="col-6 col-sm-4">
                <div className="p-3 rounded-3 bg-subtle" style={{ backgroundColor: 'var(--tv-bg-subtle)' }}>
                  <span className="text-muted d-block small">Capital City</span>
                  <strong className="fs-6" style={{ color: 'var(--tv-text-primary)' }}>{capital}</strong>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-3 rounded-3 bg-subtle" style={{ backgroundColor: 'var(--tv-bg-subtle)' }}>
                  <span className="text-muted d-block small">Total Population</span>
                  <strong className="fs-6" style={{ color: 'var(--tv-text-primary)' }}>{population}</strong>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-3 rounded-3 bg-subtle" style={{ backgroundColor: 'var(--tv-bg-subtle)' }}>
                  <span className="text-muted d-block small">Currencies</span>
                  <strong className="fs-6 text-truncate d-block" style={{ color: 'var(--tv-text-primary)' }}>{currency}</strong>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-3 rounded-3 bg-subtle" style={{ backgroundColor: 'var(--tv-bg-subtle)' }}>
                  <span className="text-muted d-block small">Official Languages</span>
                  <strong className="fs-6 text-truncate d-block" style={{ color: 'var(--tv-text-primary)' }}>{languages}</strong>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-3 rounded-3 bg-subtle" style={{ backgroundColor: 'var(--tv-bg-subtle)' }}>
                  <span className="text-muted d-block small">Time Zones</span>
                  <strong className="fs-6 text-truncate d-block" style={{ color: 'var(--tv-text-primary)' }}>{timezones}</strong>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="p-3 rounded-3 bg-subtle" style={{ backgroundColor: 'var(--tv-bg-subtle)' }}>
                  <span className="text-muted d-block small">Coordinates</span>
                  <strong className="fs-6" style={{ color: 'var(--tv-text-primary)' }}>{latlng[0]}°, {latlng[1]}°</strong>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-auto">
              <button onClick={handleStartPlanner} className="btn btn-tv-primary px-4 py-2 fw-bold d-flex align-items-center gap-2">
                <i className="bi bi-calendar-plus"></i> Add to Trip Planner
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Interactive OpenStreetMap */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
            <h5 className="fw-bold font-heading mb-3" style={{ color: 'var(--tv-text-primary)' }}>
              <i className="bi bi-map-fill text-primary me-2"></i> Location Map
            </h5>
            <MapComponent latlng={latlng} countryName={commonName} capitalName={capital} />
          </div>
        </div>

        {/* Live Weather Widget */}
        <div className="col-lg-5">
          <WeatherCard latlng={latlng} capitalName={capital} />
        </div>
      </div>

      {/* Travel Guide & Tips Section */}
      <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 mb-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
        <h4 className="fw-bold font-heading mb-4" style={{ color: 'var(--tv-text-primary)' }}>
          <i className="bi bi-journal-richtext text-primary me-2"></i> Travel Information & Guide
        </h4>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="d-flex gap-3 align-items-start">
              <i className="bi bi-sun fs-2 text-warning"></i>
              <div>
                <h6 className="fw-bold font-heading mb-1" style={{ color: 'var(--tv-text-primary)' }}>Best Time to Visit</h6>
                <p className="text-muted small">{extraInfo.bestTime}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex gap-3 align-items-start">
              <i className="bi bi-award fs-2 text-primary"></i>
              <div>
                <h6 className="fw-bold font-heading mb-1" style={{ color: 'var(--tv-text-primary)' }}>Top Attractions</h6>
                <div className="d-flex flex-wrap gap-1">
                  {extraInfo.attractions.map((att, i) => (
                    <span key={i} className="badge bg-primary-subtle text-primary small">
                      {att}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex gap-3 align-items-start">
              <i className="bi bi-people fs-2 text-info"></i>
              <div>
                <h6 className="fw-bold font-heading mb-1" style={{ color: 'var(--tv-text-primary)' }}>Local Culture</h6>
                <p className="text-muted small">{extraInfo.culture}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex gap-3 align-items-start">
              <i className="bi bi-lightbulb fs-2 text-success"></i>
              <div>
                <h6 className="fw-bold font-heading mb-1" style={{ color: 'var(--tv-text-primary)' }}>Essential Travel Tips</h6>
                <p className="text-muted small">{extraInfo.tips}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Border Countries */}
      {borders.length > 0 && (
        <div className="card border-0 shadow-sm p-4 rounded-4 mb-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
          <h5 className="fw-bold font-heading mb-3" style={{ color: 'var(--tv-text-primary)' }}>
            <i className="bi bi-signpost-split-fill text-primary me-2"></i> Neighboring Border Countries ({borders.length})
          </h5>
          <div className="row g-3">
            {borders.map((b) => (
              <div key={b.cca3} className="col-lg-3 col-md-4 col-6">
                <Link
                  to={`/destination/${b.cca3}`}
                  className="card border-0 p-3 shadow-sm text-decoration-none h-100 d-flex flex-row align-items-center gap-3 bg-subtle"
                  style={{ backgroundColor: 'var(--tv-bg-subtle)' }}
                >
                  <img
                    src={b.flags?.png}
                    alt={b.name?.common}
                    className="rounded object-fit-cover"
                    width="48"
                    height="32"
                  />
                  <div className="text-truncate">
                    <strong className="d-block text-truncate small font-heading text-body">{b.name?.common}</strong>
                    <span className="text-muted extra-small">{b.capital ? b.capital[0] : 'N/A'}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gemini AI Assistant Block tailored to this country */}
      <div className="mt-5">
        <AITravelAssistant initialCountry={commonName} />
      </div>
    </div>
  );
}
