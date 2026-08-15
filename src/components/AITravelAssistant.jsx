import React, { useState } from 'react';
import { generateAITravelPlan } from '../services/geminiApi';

export default function AITravelAssistant({ initialCountry = '' }) {
  const [prompt, setPrompt] = useState(initialCountry ? `Plan a 5-day travel itinerary for ${initialCountry}` : '');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const quickPrompts = [
    'Plan a 5-day cultural trip to Japan with food recommendations',
    '7-day romantic getaway in France exploring Paris and Riviera',
    '4-day hiking adventure in Switzerland with budget tips',
    '6-day historical exploration of Egypt pyramids & Nile river'
  ];

  const handleGenerate = async (e, customPrompt) => {
    if (e) e.preventDefault();
    const queryText = customPrompt || prompt;
    if (!queryText.trim()) return;

    setLoading(true);
    setResponse(null);
    setError('');
    try {
      const res = await generateAITravelPlan(queryText, initialCountry);
      setResponse(res);
    } catch (err) {
      setError(err.message || 'AI service is unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-lg rounded-4 p-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="d-flex align-items-center justify-content-center bg-warning text-dark rounded-circle p-3 shadow-sm">
          <i className="bi bi-stars fs-3"></i>
        </div>
        <div>
          <h4 className="fw-bold font-heading mb-1" style={{ color: 'var(--tv-text-primary)' }}>
            TravelVista AI Assistant
          </h4>
          <p className="text-muted small mb-0">
            Secure AI itinerary generation through the TravelVista server. Your Gemini key is never sent to the browser.
          </p>
        </div>
      </div>

      {/* Quick Prompt Pills */}
      <div className="mb-4">
        <span className="small text-muted fw-bold d-block mb-2">Try quick prompts:</span>
        <div className="d-flex flex-wrap gap-2">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPrompt(qp);
                handleGenerate(null, qp);
              }}
              className="btn btn-sm btn-outline-primary rounded-pill small"
            >
              <i className="bi bi-magic me-1"></i> {qp.slice(0, 35)}...
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={(e) => handleGenerate(e, null)} className="mb-4">
        <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden border" style={{ borderColor: 'var(--tv-border)' }}>
          <input
            type="text"
            className="form-control border-0 py-3 shadow-none text-body"
            style={{ backgroundColor: 'var(--tv-bg-subtle)' }}
            placeholder="Ask AI e.g. Plan a 5-day trip to Japan with local food..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" disabled={loading} className="btn btn-warning px-4 font-weight-bold text-dark d-flex align-items-center gap-2">
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Generating...
              </>
            ) : (
              <>
                <i className="bi bi-send-fill"></i> Generate Plan
              </>
            )}
          </button>
        </div>
      </form>

      {error && !loading && <div className="alert alert-warning rounded-3">{error}</div>}

      {/* AI Output Display */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-grow text-warning mb-3" style={{ width: '3rem', height: '3rem' }}></div>
          <h6 className="fw-semibold text-muted font-heading">Crafting your personalized travel itinerary...</h6>
          <span className="small text-muted">Analyzing destinations, budget levels, and local experiences.</span>
        </div>
      )}

      {response && !loading && (
        <div className="card border-0 bg-subtle p-4 rounded-4 shadow-inner mt-2" style={{ backgroundColor: 'var(--tv-bg-subtle)' }}>
          <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <span className="badge bg-primary px-3 py-2 rounded-pill">
              <i className="bi bi-robot me-1"></i> {response.isLive ? 'Live Gemini AI Response' : 'AI Offline Smart Generator'}
            </span>
            <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={() => navigator.clipboard.writeText(response.content)}>
              <i className="bi bi-clipboard me-1"></i> Copy Plan
            </button>
          </div>

          <div
            className="ai-markdown-content text-body"
            style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '0.95rem' }}
          >
            {response.content}
          </div>
        </div>
      )}
    </div>
  );
}
