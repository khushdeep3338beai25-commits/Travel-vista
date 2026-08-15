import axios from 'axios';

const API_URL = '/api/countries';
let countriesPromise = null;
let countriesCache = null;

export const fetchAllCountries = async () => {
  if (countriesCache) return countriesCache;
  if (countriesPromise) return countriesPromise;

  countriesPromise = axios.get(API_URL, { timeout: 20000 })
    .then(({ data }) => {
      if (!Array.isArray(data?.data) || data.data.length === 0) {
        throw new Error(data?.error || 'REST Countries returned no countries.');
      }
      countriesCache = data.data;
      return countriesCache;
    })
    .catch((error) => {
      countriesPromise = null;
      const message = error.response?.data?.error || error.message || 'Network request failed.';
      throw new Error(message);
    });

  return countriesPromise;
};

export const fetchCountryByCode = async (code) => {
  if (!code) return null;
  const upperCode = code.toUpperCase();

  if (countriesCache) {
    const found = countriesCache.find((c) => c.cca3 === upperCode || c.cca2 === upperCode);
    if (found) return found;
  }

  try {
    const { data } = await axios.get(`/api/countries/code?code=${encodeURIComponent(upperCode)}`, { timeout: 20000 });
    return data?.data || null;
  } catch (error) {
    console.warn(`Country lookup failed for ${upperCode}:`, error.message);
    return null;
  }
};

export const fetchCountriesByCodes = async (codes = []) => {
  const upperCodes = codes.filter(Boolean).map((c) => c.toUpperCase());
  if (!upperCodes.length) return [];

  const countries = await fetchAllCountries();
  return countries.filter((c) => upperCodes.includes(c.cca3) || upperCodes.includes(c.cca2));
};

export const clearCountriesCache = () => {
  countriesCache = null;
  countriesPromise = null;
};
