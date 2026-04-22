import React, { createContext, useContext, useReducer } from 'react';

// ─── Simulated API (as provided by the course) ───────────────────────────────
export const fetchAPI = (date) => {
  const times = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  // Seed with date so times vary per day
  const seed = date ? new Date(date).getDate() : 1;
  return times.filter((_, i) => (i + seed) % 3 !== 0);
};

export const submitAPI = (formData) => {
  // Simulates a successful submission
  console.log('Booking submitted:', formData);
  return true;
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
const initialState = {
  availableTimes: fetchAPI(new Date()),
  confirmedBookings: [],
};

export const timesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return {
        ...state,
        availableTimes: fetchAPI(action.payload),
      };
    case 'ADD_BOOKING':
      return {
        ...state,
        confirmedBookings: [...state.confirmedBookings, action.payload],
      };
    default:
      return state;
  }
};

// ─── Context ─────────────────────────────────────────────────────────────────
const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timesReducer, initialState);

  const updateTimes = (date) => dispatch({ type: 'UPDATE_TIMES', payload: date });
  const addBooking = (booking) => dispatch({ type: 'ADD_BOOKING', payload: booking });

  return (
    <BookingContext.Provider value={{ ...state, updateTimes, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};
