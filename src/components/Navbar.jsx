import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useFavorites } from '../context/FavoritesContext';
import { useCompare } from '../context/CompareContext';
import { usePlanner } from '../context/PlannerContext';

export default function Navbar() {
  const { favorites } = useFavorites();
  const { compareList } = useCompare();
  const { trips } = usePlanner();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* ================= NAVBAR CSS ================= */}
      <style>{`
        /* ===============================
           MAIN NAVBAR
        =============================== */

        .tv-navbar {
          min-height: 78px;
          padding: 10px 0 !important;
          background: var(--tv-bg-primary, #0b1220);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          transition: all 0.3s ease;
          z-index: 1050;
        }

        .tv-navbar.scrolled {
          min-height: 68px;
          background: rgba(11, 18, 32, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.18);
        }

        /* ===============================
           LOGO
        =============================== */

        .tv-brand {
          flex-shrink: 0;
          margin-right: 20px;
        }

        .tv-logo {
          width: 42px;
          height: 42px;
          min-width: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: linear-gradient(135deg, #20b5f3, #1685e8);
          box-shadow: 0 4px 12px rgba(32,181,243,0.25);
          transition: all 0.3s ease;
        }

        .tv-brand:hover .tv-logo {
          transform: rotate(12deg) scale(1.05);
        }

        .tv-brand-name {
          font-size: 1.45rem;
          font-weight: 800;
          line-height: 1;
          white-space: nowrap;
          color: var(--tv-text-primary, #fff);
          letter-spacing: -0.03em;
        }

        .tv-tagline {
          margin-top: 3px;
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #8d96a8;
          white-space: nowrap;
        }

        /* ===============================
           NAVIGATION
        =============================== */

        .tv-nav-list {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          gap: 2px;
          margin: 0 auto !important;
        }

        .tv-nav-item {
          white-space: nowrap;
        }

        .tv-nav-link {
          display: flex !important;
          align-items: center;
          justify-content: center;
          gap: 5px;

          padding: 9px 8px !important;

          border-radius: 8px;

          font-size: 0.86rem;
          font-weight: 600;

          white-space: nowrap;

          color: var(--tv-text-secondary, #aeb7c7) !important;

          transition: all 0.2s ease;
        }

        .tv-nav-link i {
          font-size: 0.95rem;
          flex-shrink: 0;
        }

        .tv-nav-link:hover {
          color: #fff !important;
          background: rgba(33,150,243,0.09);
        }

        .tv-nav-link.active {
          color: #27b3f1 !important;
          background: rgba(33,150,243,0.10);
        }

        /* ===============================
           AI ASSISTANT
        =============================== */

        .tv-ai-link {
          color: #ffc107 !important;
          font-weight: 700 !important;
        }

        .tv-ai-link:hover {
          color: #ffd54f !important;
          background: rgba(255,193,7,0.08);
        }

        /* ===============================
           BADGES
        =============================== */

        .tv-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-width: 17px;
          height: 17px;

          padding: 2px 5px;

          font-size: 0.60rem;
          line-height: 1;

          border-radius: 50rem;

          animation: tvBadgePop 0.25s ease;
        }

        @keyframes tvBadgePop {
          from {
            opacity: 0;
            transform: scale(0.6);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* ===============================
           RIGHT SIDE
        =============================== */

        .tv-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .tv-explore-btn {
          min-height: 44px;

          padding: 10px 17px !important;

          border: none !important;
          border-radius: 8px !important;

          color: white !important;

          font-size: 0.88rem;
          font-weight: 700;

          white-space: nowrap;

          background: linear-gradient(
            135deg,
            #2cb8f5,
            #229de5
          ) !important;

          box-shadow: 0 5px 15px rgba(34,157,229,0.20);

          transition: all 0.2s ease;
        }

        .tv-explore-btn:hover {
          color: white !important;
          transform: translateY(-2px);

          box-shadow:
            0 8px 22px rgba(34,157,229,0.35);
        }

        /* ===============================
           MOBILE TOGGLE
        =============================== */

        .tv-toggler {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;

          padding: 7px 10px !important;

          border-radius: 8px !important;

          background: var(--tv-bg-subtle, #151e31) !important;
        }

        /* ===============================
           TABLET / SMALL LAPTOP
        =============================== */

        @media (min-width: 992px) and (max-width: 1250px) {

          .tv-brand {
            margin-right: 8px;
          }

          .tv-brand-name {
            font-size: 1.25rem;
          }

          .tv-nav-list {
            gap: 0;
          }

          .tv-nav-link {
            padding-left: 5px !important;
            padding-right: 5px !important;
            font-size: 0.76rem;
          }

          .tv-nav-link i {
            font-size: 0.82rem;
          }

          .tv-explore-btn {
            padding: 8px 11px !important;
            font-size: 0.78rem;
          }
        }

        /* ===============================
           MOBILE
        =============================== */

        @media (max-width: 991.98px) {

          .tv-navbar {
            min-height: 68px;
          }

          .tv-brand {
            margin-right: 0;
          }

          .tv-brand-name {
            font-size: 1.25rem;
          }

          .tv-logo {
            width: 38px;
            height: 38px;
            min-width: 38px;
          }

          .tv-collapse {
            margin-top: 12px;

            padding: 10px;

            border-radius: 14px;

            background: var(--tv-bg-primary, #0b1220);

            box-shadow:
              0 10px 30px rgba(0,0,0,0.25);
          }

          .tv-nav-list {
            width: 100%;

            display: flex;

            align-items: stretch !important;

            flex-direction: column;

            gap: 3px;
          }

          .tv-nav-item {
            width: 100%;
          }

          .tv-nav-link {
            justify-content: flex-start;

            width: 100%;

            padding: 11px 14px !important;

            font-size: 0.95rem;
          }

          .tv-nav-link i {
            width: 22px;
            text-align: center;
          }

        }

        /* ===============================
           VERY SMALL MOBILE
        =============================== */

        @media (max-width: 480px) {

          .tv-brand-name {
            font-size: 1.15rem;
          }

          .tv-tagline {
            font-size: 0.48rem;
          }

          .tv-logo {
            width: 36px;
            height: 36px;
            min-width: 36px;
          }

        }
      `}</style>

      {/* ===============================
          NAVBAR
      =============================== */}

      <nav
        className={`navbar navbar-expand-lg sticky-top tv-navbar ${
          scrolled ? 'scrolled' : ''
        }`}
      >

        <div className="container-fluid px-3 px-xl-4">

          {/* ===============================
              BRAND
          =============================== */}

          <Link
            className="navbar-brand tv-brand d-flex align-items-center gap-2 text-decoration-none"
            to="/"
          >

            <div className="tv-logo">
              <i className="bi bi-compass-fill fs-4"></i>
            </div>

            <div className="d-flex flex-column">

              <span className="tv-brand-name">
                Travel<span className="text-primary">Vista</span>
              </span>

              <span className="tv-tagline">
                EXPLORE THE WORLD
              </span>

            </div>

          </Link>


          {/* ===============================
              MOBILE CONTROLS
          =============================== */}

          <div className="d-flex align-items-center gap-2 d-lg-none">

            <ThemeToggle />

            <button
              className="navbar-toggler tv-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMain"
              aria-controls="navbarMain"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list fs-2 text-primary"></i>
            </button>

          </div>


          {/* ===============================
              NAVIGATION
          =============================== */}

          <div
            className="collapse navbar-collapse tv-collapse"
            id="navbarMain"
          >

            <ul className="navbar-nav tv-nav-list">

              {/* HOME */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link"
                  to="/"
                  end
                >
                  <i className="bi bi-house-door"></i>
                  <span>Home</span>
                </NavLink>
              </li>


              {/* DESTINATIONS */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link"
                  to="/destinations"
                >
                  <i className="bi bi-globe"></i>
                  <span>Destinations</span>
                </NavLink>
              </li>


              {/* FAVORITES */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link"
                  to="/favorites"
                >
                  <i className="bi bi-heart"></i>
                  <span>Favorites</span>

                  {favorites.length > 0 && (
                    <span className="badge bg-danger tv-badge">
                      {favorites.length}
                    </span>
                  )}
                </NavLink>
              </li>


              {/* PLANNER */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link"
                  to="/planner"
                >
                  <i className="bi bi-calendar-check"></i>
                  <span>Planner</span>

                  {trips.length > 0 && (
                    <span className="badge bg-success tv-badge">
                      {trips.length}
                    </span>
                  )}
                </NavLink>
              </li>


              {/* COMPARE */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link"
                  to="/compare"
                >
                  <i className="bi bi-arrow-left-right"></i>
                  <span>Compare</span>

                  {compareList.length > 0 && (
                    <span className="badge bg-primary tv-badge">
                      {compareList.length}
                    </span>
                  )}
                </NavLink>
              </li>


              {/* AI ASSISTANT */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link tv-ai-link"
                  to="/ai-assistant"
                >
                  <i className="bi bi-stars"></i>
                  <span>AI</span>
                </NavLink>
              </li>


              {/* CURRENCY */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link"
                  to="/currency"
                >
                  <i className="bi bi-currency-exchange"></i>
                  <span>Currency</span>
                </NavLink>
              </li>


              {/* ABOUT */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link"
                  to="/about"
                >
                  <span>About</span>
                </NavLink>
              </li>


              {/* CONTACT */}
              <li className="nav-item tv-nav-item">
                <NavLink
                  className="nav-link tv-nav-link"
                  to="/contact"
                >
                  <span>Contact</span>
                </NavLink>
              </li>

            </ul>


            {/* ===============================
                RIGHT ACTIONS
            =============================== */}

            <div className="tv-right d-none d-lg-flex">

              <ThemeToggle />

              <Link
                to="/destinations"
                className="btn tv-explore-btn d-flex align-items-center gap-2"
              >
                <i className="bi bi-send-fill"></i>
                <span>Explore Now</span>
              </Link>

            </div>

          </div>

        </div>

      </nav>
    </>
  );
}