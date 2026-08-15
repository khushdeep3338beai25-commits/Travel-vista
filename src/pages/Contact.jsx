import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import MapComponent from '../components/MapComponent';

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all required fields.', 'warning');
      return;
    }
    setSending(true);
    // The frontend does not contain a mail-delivery backend, so never claim a message was sent.
    const subject = encodeURIComponent(formData.subject || 'TravelVista Support Request');
    const body = encodeURIComponent([
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      '',
      formData.message
    ].join('\n'));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setSending(false);
    addToast('Your email client has been opened with the message prepared.', 'info');
  };

  const faqs = [
    {
      q: 'How does TravelVista obtain country information?',
      a: 'We use the free public REST Countries API to display real-time demographics, currencies, flags, and capitals for over 250 countries.'
    },
    {
      q: 'Do I need an API key to run this application?',
      a: 'Country, weather, map, and currency features work without browser API keys. The optional Gemini assistant requires a server-side GEMINI_API_KEY.'
    },
    {
      q: 'Where are my saved favorites and travel plans stored?',
      a: 'All saved wishlist items and trip itineraries are stored securely in your browser’s LocalStorage.'
    },
    {
      q: 'Can I export or download my trip itinerary?',
      a: 'Yes, you can manage your itineraries in the Travel Planner tab and copy AI generated plans with one click.'
    }
  ];

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-5">
        <span className="badge bg-primary px-3 py-2 rounded-pill mb-2">Get In Touch</span>
        <h1 className="display-5 fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>
          Contact Support & Feedback
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
          Have questions about travel destinations, recommendations, or app features? We'd love to hear from you.
        </p>
      </div>

      <div className="row g-4 mb-5">
        {/* Contact Form */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
            <h4 className="fw-bold font-heading mb-4" style={{ color: 'var(--tv-text-primary)' }}>
              Send Us a Message
            </h4>

            {submitted && (
              <div className="alert alert-success alert-dismissible fade show rounded-3" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                Your email client was opened with your message prepared. Send it from there to complete delivery.
                <button type="button" className="btn-close" onClick={() => setSubmitted(false)} aria-label="Close"></button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Itinerary advice / General inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-muted">Message *</label>
                <textarea
                  name="message"
                  rows="5"
                  className="form-control"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="col-12 mt-4">
                <button type="submit" disabled={sending} className="btn btn-tv-primary w-100 py-3 font-weight-bold rounded-3">
                  <i className="bi bi-send-fill me-2"></i> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info & Office Map */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 rounded-4 mb-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
            <h5 className="fw-bold font-heading mb-4" style={{ color: 'var(--tv-text-primary)' }}>
              Contact Information
            </h5>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle" style={{ width: '42px', height: '42px' }}>
                  <i className="bi bi-geo-alt-fill fs-5"></i>
                </div>
                <div>
                  <span className="small text-muted d-block">Global Headquarters</span>
                  <strong style={{ color: 'var(--tv-text-primary)' }}>777 Voyager Way, San Francisco, CA</strong>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle" style={{ width: '42px', height: '42px' }}>
                  <i className="bi bi-envelope-fill fs-5"></i>
                </div>
                <div>
                  <span className="small text-muted d-block">Support Email</span>
                  <strong style={{ color: 'var(--tv-text-primary)' }}>support@travelvista.com</strong>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle" style={{ width: '42px', height: '42px' }}>
                  <i className="bi bi-telephone-fill fs-5"></i>
                </div>
                <div>
                  <span className="small text-muted d-block">Customer Care Line</span>
                  <strong style={{ color: 'var(--tv-text-primary)' }}>+1 (800) 555-VISTA</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Headquarters Location Map */}
          <div className="card border-0 shadow-sm p-3 rounded-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
            <h6 className="fw-bold font-heading mb-3" style={{ color: 'var(--tv-text-primary)' }}>
              <i className="bi bi-buildings text-primary me-2"></i> Our Location
            </h6>
            <MapComponent latlng={[37.7749, -122.4194]} countryName="TravelVista HQ" capitalName="San Francisco" />
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 mb-5" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
        <h4 className="fw-bold font-heading mb-4 text-center" style={{ color: 'var(--tv-text-primary)' }}>
          Frequently Asked Questions (FAQ)
        </h4>

        <div className="accordion accordion-flush" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div key={index} className="accordion-item bg-transparent border-bottom">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button collapsed bg-transparent text-body fw-bold font-heading shadow-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {faq.q}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
