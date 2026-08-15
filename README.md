# 🌎TravelVista – Live Travel Explorer

TravelVista is a React + Vite travel application for exploring live country data, maps, current weather, currency rates, wishlists, comparisons, trip planning, and optional Gemini-powered itineraries.

## What was fixed

- Country data is no longer bundled as an 8-country fallback dataset.
- Destination search now works across common/official name, ISO codes, capital, region, subregion, currencies, and languages.
- Search and region filters preserve each other in the URL.
- Country detail and border lookups use live REST Countries data and show a real error when the provider is unavailable.
- Weather uses keyless Open-Meteo instead of generated/mock temperatures.
- Currency conversion no longer falls back to hard-coded exchange rates.
- Fake customer testimonials and fake usage statistics were removed.
- “Popular/Trending” cards are now data-driven instead of depending on API response order.
- Footer links that previously pointed to fake social/hash destinations were removed.
- Newsletter/contact UI no longer claims that a backend message was delivered.
- Gemini API access was moved behind a server endpoint so the secret is not exposed to the browser.
- The checked-in `.env` containing exposed credentials was removed.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Gemini (optional)

Copy `.env.example` to `.env` and set:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=8787
```

`GEMINI_API_KEY` is server-only. Do not rename it to `VITE_GEMINI_API_KEY`.

### 3. Run the AI server

```bash
npm run server
```

### 4. Run the frontend in another terminal

```bash
npm run dev
```

Vite proxies `/api/*` requests to `http://localhost:8787`.

If Gemini is not configured, the rest of the application still works; the AI page will clearly report that the AI service is unavailable rather than displaying fake demo data.

## Production

```bash
npm run build
npm run preview
```

The Gemini endpoint requires the server process to be deployed separately or behind the same host/reverse proxy.

## Data sources

- REST Countries — country demographics, flags, currencies, languages, borders and coordinates.
- Open-Meteo — current weather.
- OpenStreetMap — map tiles.
- ExchangeRate-API — exchange rates.
- Google Gemini — optional AI itinerary generation through the server endpoint.

## Important security note

The original project archive contained API credentials in `.env`. Those credentials should be considered compromised because they were present in a client-side project archive. **Rotate/revoke the original Gemini and weather credentials immediately.** Never commit secrets or expose private API keys through `VITE_*` variables.
### Required server environment variables

Create a `.env` file in the project root (next to `package.json`) with:

```env
GEMINI_API_KEY=your_gemini_api_key
REST_COUNTRIES_API_KEY=your_rest_countries_api_key
PORT=8787
```

REST Countries moved to its authenticated v5 API. The app now keeps that key server-side and proxies live country data through `/api/countries`; it no longer calls the deprecated v3.1 browser endpoint.

