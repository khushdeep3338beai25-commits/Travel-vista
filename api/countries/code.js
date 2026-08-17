import {
  getAllCountries,
  sendJson,
} from '../_lib/countries.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, {
      error: 'Method not allowed',
    });
  }

  const rawCode = Array.isArray(req.query.code)
    ? req.query.code[0]
    : req.query.code;

  const code = rawCode?.trim().toUpperCase();

  if (!code) {
    return sendJson(res, 400, {
      error: 'Country code is required.',
    });
  }

  try {
    const countries = await getAllCountries();

    const country =
      countries.find(
        (item) =>
          item.cca2 === code || item.cca3 === code,
      ) || null;

    return sendJson(res, 200, { data: country });
  } catch (error) {
    console.error('Country lookup failed:', error);

    return sendJson(res, error.status || 502, {
      error: `Unable to load country data: ${error.message}`,
    });
  }
}