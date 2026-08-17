const REST_COUNTRIES_BASE = 'https://api.restcountries.com/countries/v5';

const RESPONSE_FIELDS = [
  'names',
  'codes.alpha_2',
  'codes.alpha_3',
  'region',
  'subregion',
  'population',
  'flag.url_svg',
  'flag.url_png',
  'flag.description',
  'capitals',
  'currencies',
  'languages',
  'coordinates',
  'borders',
  'timezones',
  'landlocked',
  'area',
  'memberships.un',
].join(',');

let countryCache = null;
let countryCacheAt = 0;
const CACHE_TTL = 10 * 60 * 1000;

export function sendJson(res, status, body) {
  res.status(status).json(body);
}

function normalizeCountry(country) {
  const currencies = {};

  for (const currency of country?.currencies || []) {
    if (!currency?.code) continue;

    currencies[currency.code] = {
      name: currency.name || currency.code,
      symbol: currency.symbol || '',
    };
  }

  const languages = {};

  for (const language of country?.languages || []) {
    const key =
      language?.bcp47 ||
      language?.iso_639_3 ||
      language?.name;

    if (key && language?.name) {
      languages[key] = language.name;
    }
  }

  return {
    name: {
      common: country?.names?.common || '',
      official:
        country?.names?.official ||
        country?.names?.common ||
        '',
    },
    capital: (country?.capitals || [])
      .map((capital) => capital?.name)
      .filter(Boolean),
    region: country?.region || '',
    subregion: country?.subregion || '',
    population: Number(country?.population || 0),
    flags: {
      svg: country?.flag?.url_svg || '',
      png: country?.flag?.url_png || '',
      alt:
        country?.flag?.description ||
        `${country?.names?.common || 'Country'} flag`,
    },
    cca2: country?.codes?.alpha_2 || '',
    cca3: country?.codes?.alpha_3 || '',
    currencies,
    languages,
    latlng: [
      country?.coordinates?.lat,
      country?.coordinates?.lng,
    ].every(Number.isFinite)
      ? [
          country.coordinates.lat,
          country.coordinates.lng,
        ]
      : [],
    borders: Array.isArray(country?.borders)
      ? country.borders
      : [],
    timezones: Array.isArray(country?.timezones)
      ? country.timezones
      : [],
    unMember: Boolean(country?.memberships?.un),
    landlocked: Boolean(country?.landlocked),
    area: Number(country?.area?.kilometers || 0),
  };
}

async function fetchRestCountries(url) {
  const apiKey = process.env.REST_COUNTRIES_API_KEY;

  if (!apiKey) {
    const error = new Error(
      'REST_COUNTRIES_API_KEY is not configured on Vercel.',
    );
    error.status = 503;
    throw error;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    signal: AbortSignal.timeout(15000),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      payload?.errors?.[0]?.message ||
      `REST Countries returned HTTP ${response.status}.`;

    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return payload;
}

export async function getAllCountries() {
  if (
    countryCache &&
    Date.now() - countryCacheAt < CACHE_TTL
  ) {
    return countryCache;
  }

  const countries = [];
  const limit = 100;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const url =
      `${REST_COUNTRIES_BASE}` +
      `?limit=${limit}` +
      `&offset=${offset}` +
      `&response_fields=${encodeURIComponent(RESPONSE_FIELDS)}`;

    const payload = await fetchRestCountries(url);
    const objects = payload?.data?.objects;

    if (!Array.isArray(objects)) {
      throw new Error(
        'REST Countries returned an unexpected response.',
      );
    }

    countries.push(...objects.map(normalizeCountry));

    hasMore = Boolean(payload?.data?.meta?.more);
    offset += objects.length;

    if (!objects.length) hasMore = false;
  }

  if (!countries.length) {
    throw new Error('REST Countries returned no countries.');
  }

  countryCache = countries;
  countryCacheAt = Date.now();

  return countries;
}