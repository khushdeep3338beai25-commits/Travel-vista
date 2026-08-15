import React from 'react';
import CurrencyConverter from '../components/CurrencyConverter';

export default function CurrencyPage() {
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <span className="badge bg-primary px-3 py-2 rounded-pill mb-2">Foreign Exchange</span>
        <h1 className="display-5 fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>
          Travel Currency Converter
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '650px' }}>
          Calculate real-time foreign exchange conversions across 50+ global currencies to plan your travel spending accurately.
        </p>
      </div>

      <div className="mx-auto" style={{ maxWidth: '850px' }}>
        <CurrencyConverter />
      </div>
    </div>
  );
}
