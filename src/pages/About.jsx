import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const techStack = [
    { name: 'React.js 18', icon: 'bi-box-seam text-info', desc: 'Component-driven user interface & Hooks state architecture' },
    { name: 'Vite Build Tool', icon: 'bi-lightning-charge text-warning', desc: 'Next-generation lightning fast frontend tooling' },
    { name: 'Bootstrap 5', icon: 'bi-bootstrap text-primary', desc: 'Responsive grid system, utilities & Bootstrap Icons' },
    { name: 'React Router DOM', icon: 'bi-signpost-split text-success', desc: 'Client-side routing with clean URL parameters' },
    { name: 'REST Countries API', icon: 'bi-globe text-primary', desc: 'Open data source for 250+ countries and territories' },
    { name: 'React Leaflet Maps', icon: 'bi-map text-danger', desc: 'Interactive OpenStreetMap tile layer rendering' },
    { name: 'OpenWeatherMap', icon: 'bi-cloud-sun text-warning', desc: 'Live climate metrics and weather condition reporting' },
    { name: 'Google Gemini AI', icon: 'bi-stars text-warning', desc: 'Generative AI assistant for custom travel itineraries' }
  ];

  return (
    <div className="container py-4">
      {/* Hero Header */}
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5 bg-primary text-white">
        <div className="p-5 text-center position-relative">
          <span className="badge bg-light text-primary px-3 py-2 rounded-pill mb-3 fw-bold">About TravelVista</span>
          <h1 className="display-4 fw-bold font-heading mb-3">Empowering Global Explorers</h1>
          <p className="lead mx-auto opacity-90" style={{ maxWidth: '750px' }}>
            TravelVista is a modern, commercial-grade travel platform built to make exploring countries, understanding local cultures, comparing destinations, and planning trips seamless.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="d-flex align-items-center justify-content-center bg-primary text-white rounded-circle" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-compass-fill fs-4"></i>
              </div>
              <h3 className="fw-bold font-heading mb-0" style={{ color: 'var(--tv-text-primary)' }}>Our Mission</h3>
            </div>
            <p className="text-muted leading-relaxed">
              Our mission is to democratize global travel intelligence by uniting authoritative country data, real-time climate data, currency exchange rate tools, and generative AI planning into one intuitive, beautifully designed application.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4 rounded-4 h-100" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="d-flex align-items-center justify-content-center bg-warning text-dark rounded-circle" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-eye-fill fs-4"></i>
              </div>
              <h3 className="fw-bold font-heading mb-0" style={{ color: 'var(--tv-text-primary)' }}>Our Vision</h3>
            </div>
            <p className="text-muted leading-relaxed">
              We envision a world where anyone can effortlessly research, customize, and plan their dream travel itineraries with complete clarity on geography, weather, budget, and local recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Technologies Used Grid */}
      <section className="mb-5">
        <div className="text-center mb-4">
          <span className="text-primary font-weight-bold text-uppercase small tracking-wider">Architecture</span>
          <h2 className="display-6 fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>
            Technology Stack
          </h2>
          <p className="text-muted">Built following modern React best practices and production-ready code structure.</p>
        </div>

        <div className="row g-3">
          {techStack.map((tech, i) => (
            <div key={i} className="col-lg-3 col-md-6">
              <div className="card tv-card border-0 p-4 h-100" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
                <i className={`bi ${tech.icon} display-5 mb-3 d-block`}></i>
                <h5 className="fw-bold font-heading mb-1" style={{ color: 'var(--tv-text-primary)' }}>{tech.name}</h5>
                <p className="text-muted small mb-0">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Developer Section */}
      <section className="card border-0 shadow-sm p-4 p-md-5 rounded-4 mb-5" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
        <div className="row g-4 align-items-center">
          <div className="col-md-3 text-center">
            <div className="d-inline-block p-2 bg-primary-subtle rounded-circle mb-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Developer Profile"
                className="rounded-circle object-fit-cover shadow"
                width="140"
                height="140"
              />
            </div>
          </div>
          <div className="col-md-9">
            <span className="badge bg-success px-3 py-2 rounded-pill mb-2">Lead Full-Stack Developer</span>
            <h3 className="fw-bold font-heading mb-2" style={{ color: 'var(--tv-text-primary)' }}>
              Built for Modern Web Standards
            </h3>
            <p className="text-muted mb-3">
              TravelVista was engineered from the ground up with modular architecture, strict state isolation using React Context, zero hardcoded API keys, LocalStorage persistence, accessibility compliance, and dynamic dark/light mode switching.
            </p>
            <div className="d-flex gap-3">
              <Link to="/destinations" className="btn btn-tv-primary rounded-pill px-4">
                Explore App Features
              </Link>
              <Link to="/contact" className="btn btn-outline-secondary rounded-pill px-4">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
