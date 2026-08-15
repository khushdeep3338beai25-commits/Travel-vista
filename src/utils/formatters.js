// Utility formatting functions for numbers, currencies, languages, timezones, etc.

export const formatPopulation = (num) => {
  if (num === undefined || num === null) return 'N/A';
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + ' B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' K';
  }
  return num.toLocaleString();
};

export const formatCurrencies = (currenciesObj) => {
  if (!currenciesObj || typeof currenciesObj !== 'object') return 'N/A';
  return Object.values(currenciesObj)
    .map((c) => `${c.name} (${c.symbol || c.name})`)
    .join(', ');
};

export const formatLanguages = (languagesObj) => {
  if (!languagesObj || typeof languagesObj !== 'object') return 'N/A';
  return Object.values(languagesObj).join(', ');
};

export const formatCapital = (capitalArr) => {
  if (!capitalArr || !Array.isArray(capitalArr) || capitalArr.length === 0) return 'N/A';
  return capitalArr.join(', ');
};

export const formatTimezones = (tzArr) => {
  if (!tzArr || !Array.isArray(tzArr) || tzArr.length === 0) return 'N/A';
  return tzArr.slice(0, 3).join(', ') + (tzArr.length > 3 ? '...' : '');
};
