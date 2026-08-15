import React, { useState, useEffect } from 'react';
import { fetchExchangeRates, convertCurrency } from '../services/exchangeApi';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('EUR');
  const [ratesData, setRatesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExchangeRates(fromCurr).then((data) => {
      setRatesData(data);
      setLoading(false);
    });
  }, [fromCurr]);

  const currenciesList = ratesData ? Object.keys(ratesData.rates) : ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'INR', 'BRL'];

  const convertedValue = ratesData
    ? convertCurrency(amount, ratesData.rates[fromCurr] || 1, ratesData.rates[toCurr] || 1)
    : 0;

  const handleSwap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  return (
    <div className="card border-0 shadow-lg rounded-4 p-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle p-3 shadow-sm">
          <i className="bi bi-currency-exchange fs-3"></i>
        </div>
        <div>
          <h4 className="fw-bold font-heading mb-1" style={{ color: 'var(--tv-text-primary)' }}>
            Real-Time Currency Converter
          </h4>
          <p className="text-muted small mb-0">Convert live foreign exchange rates for seamless trip budgeting.</p>
        </div>
      </div>

      <div className="row g-3 align-items-end">
        {/* Amount Input */}
        <div className="col-md-4">
          <label className="form-label small fw-bold text-muted">Amount</label>
          <div className="input-group">
            <span className="input-group-text bg-subtle border-secondary-subtle">
              <i className="bi bi-cash"></i>
            </span>
            <input
              type="number"
              min="1"
              className="form-control fw-bold"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Source Currency */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-muted">From Currency</label>
          <select
            className="form-select fw-semibold"
            value={fromCurr}
            onChange={(e) => setFromCurr(e.target.value)}
          >
            {currenciesList.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="col-md-2 text-center">
          <button
            type="button"
            onClick={handleSwap}
            className="btn btn-outline-primary rounded-circle p-2 shadow-sm"
            title="Swap Currencies"
            style={{ width: '44px', height: '44px' }}
          >
            <i className="bi bi-arrow-left-right"></i>
          </button>
        </div>

        {/* Destination Currency */}
        <div className="col-md-3">
          <label className="form-label small fw-bold text-muted">To Currency</label>
          <select
            className="form-select fw-semibold"
            value={toCurr}
            onChange={(e) => setToCurr(e.target.value)}
          >
            {currenciesList.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Display Box */}
      <div className="mt-4 p-4 rounded-4 bg-primary text-white text-center shadow-sm position-relative">
        <span className="text-white-50 text-uppercase small fw-bold tracking-wider">Converted Result</span>
        <div className="display-5 fw-bold font-heading my-1">
          {convertedValue} <span className="fs-3 font-weight-normal">{toCurr}</span>
        </div>
        <div className="small text-white-50">
          1 {fromCurr} = {ratesData?.rates ? (ratesData.rates[toCurr] / (ratesData.rates[fromCurr] || 1)).toFixed(4) : '...'} {toCurr}
        </div>
      </div>
    </div>
  );
}
