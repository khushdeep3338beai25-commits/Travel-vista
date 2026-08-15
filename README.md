# 🌍 TravelVista – Explore the World

TravelVista is a modern travel exploration web application built with **React, Vite, Bootstrap, and Node.js**.

It allows users to explore countries using live data, search and filter destinations, view detailed country information, check weather, explore locations on an interactive map, compare countries, save favorites, create travel plans, convert currencies, and optionally use an AI travel assistant.

---

## ✨ Features

### 🌎 Explore Destinations
- Browse countries from live REST Countries data
- Search by:
  - Country name
  - Official country name
  - Capital
  - Region
  - Subregion
  - Currency
  - Language
  - ISO country codes
- Filter countries by region
- Sort destinations alphabetically or by population
- Pagination for destination results

### 🔎 Search & Filtering
The destination search is dynamically connected to the country data.

Search results update based on the user's query without relying on a hard-coded country list.

URL parameters are used for search and region filters so the current filter state can be preserved.

### 🗺️ Destination Details
Each destination provides:
- Country name
- Official name
- Capital
- Population
- Region
- Subregion
- Currency
- Languages
- Time zones
- Coordinates
- Country flag
- Bordering countries
- Interactive map
- Weather information
- Travel tips
- Popular attractions
- Local culture information
- Best time to visit

### 🌤️ Live Weather
Weather information is retrieved using **Open-Meteo**.

The application uses the country's geographic coordinates to retrieve weather information rather than displaying hard-coded temperatures.

### 🗺️ Interactive Maps
TravelVista uses **Leaflet/OpenStreetMap** to display destination locations and coordinates.

### ❤️ Favorites
Users can save destinations to their favorites/wishlist.

### ⚖️ Country Comparison
Users can add destinations to a comparison list and compare multiple countries.

### 📅 Trip Planner
Users can create travel plans with:
- Destination
- Start date
- End date
- Number of travelers
- Notes

Destinations can also be added directly to the planner from their detail page.

### 💱 Currency Converter
TravelVista provides currency conversion using live exchange-rate data.

### 🤖 AI Travel Assistant
TravelVista includes an optional Gemini-powered travel assistant.

The AI can help generate:
- Itinerary ideas
- Food suggestions
- Local etiquette
- Transportation suggestions
- Budget guidance
- Best-time-to-visit guidance

The Gemini API key is kept on the server and is **not exposed to the browser**.

### 🌙 Theme Support
The application supports theme switching for a better browsing experience.

### 📱 Responsive Design
The UI is designed to work across:
- Desktop
- Tablet
- Mobile

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router
- Vite
- Bootstrap 5
- Bootstrap Icons
- React Leaflet
- Axios

## Backend

- Node.js
- Native Node HTTP server
- dotenv
- Google Gemini SDK

## APIs & Data Sources

- REST Countries — country information
- Open-Meteo — weather
- OpenStreetMap — maps
- ExchangeRate-API — currency exchange rates
- Google Gemini — AI travel assistant

---

# 📁 Project Structure

```text
TravelVista/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AITravelAssistant.jsx
│   │   ├── CurrencyConverter.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── FavoriteButton.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── MapComponent.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── WeatherCard.jsx
│   │
│   ├── context/
│   │   ├── CompareContext.jsx
│   │   ├── FavoritesContext.jsx
│   │   ├── PlannerContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AIAssistantPage.jsx
│   │   ├── Compare.jsx
│   │   ├── Contact.jsx
│   │   ├── CurrencyPage.jsx
│   │   ├── DestinationDetails.jsx
│   │   ├── Destinations.jsx
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   └── Planner.jsx
│   │
│   ├── services/
│   │   ├── countriesApi.js
│   │   ├── exchangeApi.js
│   │   ├── geminiApi.js
│   │   └── weatherApi.js
│   │
│   ├── utils/
│   │   ├── formatters.js
│   │   └── travelGuideData.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── server.mjs
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
└── README.md
