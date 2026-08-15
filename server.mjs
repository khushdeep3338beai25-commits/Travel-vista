import 'dotenv/config';
import http from 'node:http';
import { GoogleGenAI } from '@google/genai';

const PORT = Number(process.env.PORT || 8787);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const REST_COUNTRIES_API_KEY = process.env.REST_COUNTRIES_API_KEY;
const REST_COUNTRIES_BASE = 'https://api.restcountries.com/countries/v5';
const COUNTRY_RESPONSE_FIELDS = [
  'names',
  'codes.alpha_2',
  'codes.alpha_3',
  'region',
  'subregion',
  'population',
  'flag.url_svg',
  'flag.url_png',
  'flag.emoji',
  'flag.description',
  'capitals',
  'currencies',
  'languages',
  'coordinates',
  'borders',
  'timezones',
  'landlocked',
  'area',
  'memberships.un'
].join(',');

let countryCache = null;
let countryCacheAt = 0;
const COUNTRY_CACHE_TTL = 10 * 60 * 1000;

const send = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(body));
};

const readJsonBody = async (req) => {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw || '{}');
};

const normalizeCountry = (country) => {
  const currencies = {};
  for (const currency of country?.currencies || []) {
    if (!currency?.code) continue;
    currencies[currency.code] = { name: currency.name || currency.code, symbol: currency.symbol || '' };
  }

  const languages = {};
  for (const language of country?.languages || []) {
    const key = language?.bcp47 || language?.iso_639_3 || language?.name;
    if (key && language?.name) languages[key] = language.name;
  }

  return {
    name: {
      common: country?.names?.common || '',
      official: country?.names?.official || country?.names?.common || ''
    },
    capital: (country?.capitals || []).map((capital) => capital?.name).filter(Boolean),
    region: country?.region || '',
    subregion: country?.subregion || '',
    population: Number(country?.population || 0),
    flags: {
      svg: country?.flag?.url_svg || '',
      png: country?.flag?.url_png || '',
      alt: country?.flag?.description || `${country?.names?.common || 'Country'} flag`
    },
    cca2: country?.codes?.alpha_2 || '',
    cca3: country?.codes?.alpha_3 || '',
    currencies,
    languages,
    latlng: [country?.coordinates?.lat, country?.coordinates?.lng].every(Number.isFinite)
      ? [country.coordinates.lat, country.coordinates.lng]
      : [],
    borders: Array.isArray(country?.borders) ? country.borders : [],
    timezones: Array.isArray(country?.timezones) ? country.timezones : [],
    independent: undefined,
    unMember: Boolean(country?.memberships?.un),
    landlocked: Boolean(country?.landlocked),
    area: Number(country?.area?.kilometers || 0)
  };
};

const fetchRestCountries = async (url) => {
  if (!REST_COUNTRIES_API_KEY) {
    const error = new Error('REST_COUNTRIES_API_KEY is missing from .env.');
    error.status = 503;
    throw error;
  }

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${REST_COUNTRIES_API_KEY}` },
    signal: AbortSignal.timeout(15000)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.errors?.[0]?.message || `REST Countries returned HTTP ${response.status}.`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return payload;
};

const getAllCountries = async () => {
  if (countryCache && Date.now() - countryCacheAt < COUNTRY_CACHE_TTL) return countryCache;

  const all = [];
  let offset = 0;
  const limit = 100;
  let more = true;

  while (more) {
    const url = `${REST_COUNTRIES_BASE}?limit=${limit}&offset=${offset}&response_fields=${encodeURIComponent(COUNTRY_RESPONSE_FIELDS)}`;
    const payload = await fetchRestCountries(url);
    const objects = payload?.data?.objects;
    if (!Array.isArray(objects)) throw new Error('REST Countries returned an unexpected response shape.');
    all.push(...objects.map(normalizeCountry));
    const meta = payload?.data?.meta || {};
    more = Boolean(meta.more);
    offset += objects.length;
    if (!objects.length) more = false;
  }

  if (!all.length) throw new Error('REST Countries returned no countries.');
  countryCache = all;
  countryCacheAt = Date.now();
  return all;
};

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    });
    return res.end();
  }

  if (req.method === 'GET' && req.url === '/api/health') {
    return send(res, 200, {
      ok: true,
      geminiConfigured: Boolean(GEMINI_API_KEY),
      restCountriesConfigured: Boolean(REST_COUNTRIES_API_KEY)
    });
  }

  if (req.method === 'GET' && req.url === '/api/countries') {
    try {
      return send(res, 200, { data: await getAllCountries() });
    } catch (error) {
      console.error('Country data request failed:', error.message);
      return send(res, error.status || 502, { error: `Unable to load live country data: ${error.message}` });
    }
  }

  if (req.method === 'GET' && req.url.startsWith('/api/countries/code')) {
    try {
      const code = new URL(req.url, `http://localhost:${PORT}`).searchParams.get('code')?.toUpperCase();
      if (!code) return send(res, 400, { error: 'Country code is required.' });
      const countries = await getAllCountries();
      const country = countries.find((item) => item.cca2 === code || item.cca3 === code) || null;
      return send(res, 200, { data: country });
    } catch (error) {
      console.error('Country lookup failed:', error.message);
      return send(res, error.status || 502, { error: `Unable to load country data: ${error.message}` });
    }
  }

  if (req.method !== 'POST' || req.url !== '/api/ai/travel-plan') {
    return send(res, 404, { error: 'Not found' });
  }

  if (!GEMINI_API_KEY) return send(res, 503, { error: 'AI is not configured. Set GEMINI_API_KEY on the server.' });

  try {
    const { prompt, countryName = '' } = await readJsonBody(req);
    if (typeof prompt !== 'string' || !prompt.trim()) return send(res, 400, { error: 'A travel prompt is required.' });
    if (prompt.length > 4000) return send(res, 413, { error: 'Prompt is too long.' });

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const instruction = `You are TravelVista AI, a careful travel planning assistant.\nUser request: ${prompt.trim()}\n${countryName ? `Focus country: ${countryName}` : ''}\nProvide practical, clearly labeled itinerary ideas, food suggestions, local etiquette, transport notes, budget ranges, and best-time guidance. Do not invent live prices, availability, closures, or safety conditions; tell the user when something needs current verification.`;
    const result = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: instruction
    });
    return send(res, 200, { content: result.text || '' });
  } catch (error) {
    console.error('AI request failed:', error.message);
    return send(res, 502, { error: 'The AI provider could not complete the request.' });
  }
});

server.listen(PORT, () => console.log(`TravelVista API server listening on http://localhost:${PORT}`));
