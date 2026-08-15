import React from 'react';
import AITravelAssistant from '../components/AITravelAssistant';

export default function AIAssistantPage() {
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-2">
          <i className="bi bi-stars me-1"></i> AI Travel Planner
        </span>
        <h1 className="display-5 fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>
          Google Gemini AI Travel Assistant
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '650px' }}>
          Generate instant, highly detailed multi-day travel itineraries, local food guides, cultural etiquette tips, and estimated budgets.
        </p>
      </div>

      <AITravelAssistant />
    </div>
  );
}
