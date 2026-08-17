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

  try {
    const countries = await getAllCountries();
    return sendJson(res, 200, { data: countries });
  } catch (error) {
    console.error('Country request failed:', error);

    return sendJson(res, error.status || 502, {
      error: `Unable to load live country data: ${error.message}`,
    });
  }
}