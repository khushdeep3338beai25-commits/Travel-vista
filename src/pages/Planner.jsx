import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';
import { useToast } from '../context/ToastContext';

export default function Planner() {
  const { trips, addTrip, deleteTrip, addActivityToTrip, removeActivityFromTrip } = usePlanner();
  const { addToast } = useToast();

  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [notes, setNotes] = useState('');

  const [activeTripId, setActiveTripId] = useState(null);
  const [newActivityDay, setNewActivityDay] = useState(1);
  const [newActivityText, setNewActivityText] = useState('');

  const handleCreateTrip = (e) => {
    e.preventDefault();
    if (!title || !destination) {
      addToast('Please enter a trip title and destination', 'warning');
      return;
    }
    const newId = addTrip({
      title,
      destination,
      startDate: startDate || new Date().toISOString().slice(0, 10),
      endDate: endDate || new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      travelers: Number(travelers),
      notes
    });

    setTitle('');
    setDestination('');
    setNotes('');
    setActiveTripId(newId);
  };

  const handleAddActivity = (e, tripId) => {
    e.preventDefault();
    if (!newActivityText.trim()) return;
    addActivityToTrip(tripId, Number(newActivityDay), newActivityText.trim());
    setNewActivityText('');
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <span className="badge bg-success px-3 py-2 rounded-pill mb-2">Trip Planner</span>
          <h1 className="display-5 fw-bold font-heading mb-0" style={{ color: 'var(--tv-text-primary)' }}>
            Personal Travel Itinerary
          </h1>
          <p className="text-muted small">Design and customize day-by-day travel plans saved in your browser.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Create New Trip Form */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 rounded-4" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
            <h4 className="fw-bold font-heading mb-3" style={{ color: 'var(--tv-text-primary)' }}>
              <i className="bi bi-plus-circle-fill text-success me-2"></i> Create New Trip
            </h4>

            <form onSubmit={handleCreateTrip} className="d-flex flex-column gap-3">
              <div>
                <label className="form-label small fw-bold text-muted">Trip Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Summer Vacation in Tokyo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label small fw-bold text-muted">Target Destination</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Japan, France, Italy"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold text-muted">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label small fw-bold text-muted">Number of Travelers</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                />
              </div>

              <div>
                <label className="form-label small fw-bold text-muted">Trip Notes / Budget</label>
                <textarea
                  rows="3"
                  className="form-control"
                  placeholder="Hotel reservations, flight codes, packing list..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success w-100 py-2 font-weight-bold rounded-3">
                <i className="bi bi-save me-1"></i> Save Trip Itinerary
              </button>
            </form>
          </div>
        </div>

        {/* Saved Trips & Day-by-Day Activities */}
        <div className="col-lg-7">
          {trips.length === 0 ? (
            <div className="card border-0 shadow-sm p-5 text-center rounded-4 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
              <i className="bi bi-calendar-range display-3 text-muted mb-3"></i>
              <h4 className="fw-bold font-heading" style={{ color: 'var(--tv-text-primary)' }}>No trips created yet</h4>
              <p className="text-muted small">Fill out the form on the left to start building your custom day-by-day travel schedule.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {trips.map((trip) => {
                const isSelected = activeTripId === trip.id || trips.length === 1;

                return (
                  <div key={trip.id} className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ backgroundColor: 'var(--tv-bg-surface)' }}>
                    <div className="card-header border-0 bg-primary text-white p-4 d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="fw-bold font-heading mb-1">{trip.title}</h4>
                        <span className="badge bg-light text-primary me-2">
                          <i className="bi bi-geo-alt-fill me-1"></i> {trip.destination}
                        </span>
                        <span className="badge bg-white text-dark me-2">
                          <i className="bi bi-people-fill me-1"></i> {trip.travelers} Travelers
                        </span>
                        <span className="small opacity-75">
                          {trip.startDate} to {trip.endDate}
                        </span>
                      </div>

                      <button
                        onClick={() => deleteTrip(trip.id)}
                        className="btn btn-sm btn-danger rounded-circle p-2"
                        title="Delete Trip"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>

                    <div className="card-body p-4">
                      {trip.notes && (
                        <div className="alert alert-info py-2 px-3 small rounded-3 mb-3 border-0">
                          <i className="bi bi-sticky me-2"></i>
                          <strong>Notes:</strong> {trip.notes}
                        </div>
                      )}

                      <h6 className="fw-bold font-heading mb-3" style={{ color: 'var(--tv-text-primary)' }}>
                        <i className="bi bi-[#10b981] bi-list-task text-success me-2"></i> Day-by-Day Activities
                      </h6>

                      {/* Add Activity Form */}
                      <form onSubmit={(e) => handleAddActivity(e, trip.id)} className="row g-2 mb-3">
                        <div className="col-3">
                          <select
                            className="form-select form-select-sm"
                            value={newActivityDay}
                            onChange={(e) => setNewActivityDay(e.target.value)}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                              <option key={d} value={d}>Day {d}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-7">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Add activity e.g. Eiffel Tower, Local Cafe..."
                            value={activeTripId === trip.id ? newActivityText : ''}
                            onFocus={() => setActiveTripId(trip.id)}
                            onChange={(e) => {
                              setActiveTripId(trip.id);
                              setNewActivityText(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-2">
                          <button type="submit" className="btn btn-sm btn-primary w-100">
                            Add
                          </button>
                        </div>
                      </form>

                      {/* Activities List */}
                      {(!trip.activities || trip.activities.length === 0) ? (
                        <p className="text-muted small fst-italic mb-0">No activities added yet. Add items for Day 1, Day 2, etc.</p>
                      ) : (
                        <div className="d-flex flex-column gap-2">
                          {trip.activities.map((act) => (
                            <div
                              key={act.id}
                              className="d-flex align-items-center justify-content-between p-2 rounded-3 bg-subtle small"
                              style={{ backgroundColor: 'var(--tv-bg-subtle)' }}
                            >
                              <div>
                                <span className="badge bg-secondary me-2">Day {act.day}</span>
                                <span className="fw-semibold text-body">{act.text}</span>
                              </div>
                              <button
                                onClick={() => removeActivityFromTrip(trip.id, act.id)}
                                className="btn btn-link text-danger p-0 ms-2"
                              >
                                <i className="bi bi-x-circle"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
