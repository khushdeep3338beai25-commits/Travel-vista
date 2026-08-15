import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import {
  formatPopulation,
  formatCurrencies,
  formatCapital
} from '../utils/formatters';
import { useCompare } from '../context/CompareContext';

export default function DestinationCard({ country }) {
  const { isComparing, addToCompare, removeFromCompare } = useCompare();

  if (!country) return null;

  const countryName = country.name?.common || 'Unknown Country';

  // Start with this country's own flag.
  // This prevents every country from showing the same image.
  const fallbackImage =
    country.flags?.svg ||
    country.flags?.png ||
    '';

  const [destinationImage, setDestinationImage] = useState(fallbackImage);

  useEffect(() => {
    let cancelled = false;

    const loadCountryImage = async () => {
      try {
        const wikipediaTitle = encodeURIComponent(countryName);

        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${wikipediaTitle}`
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        const image =
          data.originalimage?.source ||
          data.thumbnail?.source ||
          '';

        if (image && !cancelled) {
          setDestinationImage(image);
        }
      } catch (error) {
        // Keep the country's flag if the destination image cannot be loaded.
        console.warn(
          `Could not load destination image for ${countryName}`,
          error
        );
      }
    };

    loadCountryImage();

    return () => {
      cancelled = true;
    };
  }, [countryName]);

  const capital = formatCapital(country.capital);
  const region = country.region || 'World';
  const population = formatPopulation(country.population);
  const currency = formatCurrencies(country.currencies);
  const code = country.cca3;

  const comparing = isComparing(code);

  return (
    <div className="card tv-card h-100 position-relative border-0 shadow-sm">

      {/* Destination Image */}
      <div
        className="position-relative overflow-hidden"
        style={{ height: '190px' }}
      >
        <img
          src={destinationImage || fallbackImage}
          alt={`Beautiful destination in ${countryName}`}
          className="w-100 h-100 object-fit-cover transition-transform"
          loading="lazy"
          onError={(event) => {
            // If Wikipedia image fails, use the country's flag.
            if (
              fallbackImage &&
              event.currentTarget.src !== fallbackImage
            ) {
              event.currentTarget.src = fallbackImage;
            }
          }}
          style={{
            transition: 'transform 0.5s ease'
          }}
        />

        {/* Region Badge */}
        <div className="position-absolute top-0 start-0 m-3">
          <span className="badge bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill small">
            <i className="bi bi-geo-alt-fill text-primary me-1"></i>
            {region}
          </span>
        </div>

        {/* Favorite Button */}
        <div className="position-absolute top-0 end-0 m-3">
          <FavoriteButton country={country} />
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body d-flex flex-column p-4">

        {/* Country Name */}
        <h5
          className="card-title fw-bold font-heading mb-1 text-truncate"
          style={{
            color: 'var(--tv-text-primary)'
          }}
        >
          {countryName}
        </h5>

        {/* Capital */}
        <p className="text-muted small mb-3 text-truncate">
          <i className="bi bi-building me-1 text-primary"></i>
          Capital:{' '}
          <strong className="text-body">
            {capital}
          </strong>
        </p>

        {/* Population + Currency */}
        <div
          className="row g-2 small mb-3 p-2 rounded bg-subtle"
          style={{
            backgroundColor: 'var(--tv-bg-subtle)'
          }}
        >
          <div className="col-6">
            <span className="text-muted d-block small">
              Population
            </span>

            <strong
              style={{
                color: 'var(--tv-text-primary)'
              }}
            >
              {population}
            </strong>
          </div>

          <div className="col-6">
            <span className="text-muted d-block small">
              Currency
            </span>

            <strong
              className="text-truncate d-block"
              style={{
                color: 'var(--tv-text-primary)'
              }}
              title={currency}
            >
              {currency}
            </strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto d-flex flex-column gap-2">

          {/* View Details */}
          <Link
            to={`/destination/${code}`}
            className="btn btn-tv-primary w-100 btn-sm font-weight-bold d-flex align-items-center justify-content-center gap-1"
          >
            View Details
            <i className="bi bi-arrow-right"></i>
          </Link>

          {/* Compare */}
          <button
            type="button"
            onClick={() =>
              comparing
                ? removeFromCompare(code)
                : addToCompare(country)
            }
            className={`btn btn-sm w-100 ${
              comparing
                ? 'btn-danger'
                : 'btn-outline-secondary'
            }`}
            style={{
              fontSize: '0.8rem'
            }}
          >
            <i
              className={`bi ${
                comparing
                  ? 'bi-check-circle-fill'
                  : 'bi-plus-circle'
              } me-1`}
            ></i>

            {comparing
              ? 'Remove Compare'
              : 'Add to Compare'}
          </button>

        </div>
      </div>
    </div>
  );
}