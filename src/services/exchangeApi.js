import axios from 'axios';

export const fetchExchangeRates = async (baseCurrency = 'USD') => {
  const base = String(baseCurrency || 'USD').toUpperCase();
  const { data } = await axios.get(`https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`, { timeout: 10000 });
  if (!data?.rates || data.result !== 'success') throw new Error('Exchange-rate provider returned an invalid response.');
  return {
    rates: data.rates,
    base,
    lastUpdated: data.time_last_update_utc || new Date().toISOString()
  };
};

export const convertCurrency = (amount, fromRate, toRate) => {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount < 0 || !fromRate || !toRate) return 0;
  return ((numericAmount / fromRate) * toRate).toFixed(2);
};
