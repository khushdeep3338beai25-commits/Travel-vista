import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const PlannerContext = createContext();

export const PlannerProvider = ({ children }) => {
  const [trips, setTrips] = useLocalStorage('tv_trips', []);
  const { addToast } = useToast();

  const addTrip = (tripData) => {
    const newTrip = {
      id: 'trip_' + Date.now(),
      createdAt: new Date().toISOString(),
      activities: [],
      ...tripData
    };
    setTrips((prev) => [newTrip, ...prev]);
    addToast(`Trip "${newTrip.title || 'New Trip'}" created! ✈️`, 'success');
    return newTrip.id;
  };

  const deleteTrip = (tripId) => {
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
    addToast('Trip deleted', 'warning');
  };

  const addActivityToTrip = (tripId, dayNumber, activityText) => {
    setTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === tripId) {
          const newActivities = [
            ...(trip.activities || []),
            { id: 'act_' + Date.now(), day: dayNumber, text: activityText }
          ];
          return { ...trip, activities: newActivities };
        }
        return trip;
      })
    );
    addToast('Activity added to day ' + dayNumber, 'success');
  };

  const removeActivityFromTrip = (tripId, activityId) => {
    setTrips((prev) =>
      prev.map((trip) => {
        if (trip.id === tripId) {
          return {
            ...trip,
            activities: (trip.activities || []).filter((a) => a.id !== activityId)
          };
        }
        return trip;
      })
    );
    addToast('Activity removed', 'info');
  };

  return (
    <PlannerContext.Provider value={{ trips, addTrip, deleteTrip, addActivityToTrip, removeActivityFromTrip }}>
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = () => useContext(PlannerContext);
