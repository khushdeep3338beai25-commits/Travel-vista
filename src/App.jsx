import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';
import { PlannerProvider } from './context/PlannerContext';
import { ToastProvider } from './context/ToastContext';
import { LoadingSpinner } from './components/SkeletonCard';

// Lazy Loaded Pages for optimal performance
const Home = lazy(() => import('./pages/Home'));
const Destinations = lazy(() => import('./pages/Destinations'));
const DestinationDetails = lazy(() => import('./pages/DestinationDetails'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Planner = lazy(() => import('./pages/Planner'));
const Compare = lazy(() => import('./pages/Compare'));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage'));
const CurrencyPage = lazy(() => import('./pages/CurrencyPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <CompareProvider>
            <PlannerProvider>
              <BrowserRouter>
                <div className="d-flex flex-column min-vh-100">
                  <Navbar />
                  <main className="flex-grow-1">
                    <Suspense fallback={<LoadingSpinner message="Loading page components..." />}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/destinations" element={<Destinations />} />
                        <Route path="/destination/:countryCode" element={<DestinationDetails />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/planner" element={<Planner />} />
                        <Route path="/compare" element={<Compare />} />
                        <Route path="/ai-assistant" element={<AIAssistantPage />} />
                        <Route path="/currency" element={<CurrencyPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                  <Toast />
                </div>
              </BrowserRouter>
            </PlannerProvider>
          </CompareProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
