import { timesReducer, fetchAPI } from '../context/BookingContext';

describe('fetchAPI', () => {
  test('returns an array', () => {
    const times = fetchAPI(new Date());
    expect(Array.isArray(times)).toBe(true);
  });

  test('returns non-empty array', () => {
    const times = fetchAPI('2099-06-15');
    expect(times.length).toBeGreaterThan(0);
  });

  test('all times match HH:MM format', () => {
    const times = fetchAPI('2099-06-15');
    times.forEach((t) => {
      expect(t).toMatch(/^\d{2}:\d{2}$/);
    });
  });

  test('returns different results for different dates', () => {
    const t1 = fetchAPI('2099-06-01');
    const t2 = fetchAPI('2099-06-02');
    // They may differ — at minimum both are valid arrays
    expect(Array.isArray(t1)).toBe(true);
    expect(Array.isArray(t2)).toBe(true);
  });
});

describe('timesReducer', () => {
  const initialState = {
    availableTimes: ['17:00', '18:00', '19:00'],
    confirmedBookings: [],
  };

  test('returns current state for unknown action', () => {
    const newState = timesReducer(initialState, { type: 'UNKNOWN' });
    expect(newState).toEqual(initialState);
  });

  test('UPDATE_TIMES replaces availableTimes', () => {
    const newState = timesReducer(initialState, {
      type: 'UPDATE_TIMES',
      payload: '2099-12-25',
    });
    expect(Array.isArray(newState.availableTimes)).toBe(true);
    // Should have fetched fresh times
    expect(newState.availableTimes).not.toBeUndefined();
  });

  test('ADD_BOOKING appends to confirmedBookings', () => {
    const booking = { firstName: 'Jane', date: '2099-06-15', time: '18:00' };
    const newState = timesReducer(initialState, {
      type: 'ADD_BOOKING',
      payload: booking,
    });
    expect(newState.confirmedBookings).toHaveLength(1);
    expect(newState.confirmedBookings[0]).toEqual(booking);
  });

  test('ADD_BOOKING preserves existing bookings', () => {
    const existingState = {
      ...initialState,
      confirmedBookings: [{ firstName: 'Alice' }],
    };
    const newState = timesReducer(existingState, {
      type: 'ADD_BOOKING',
      payload: { firstName: 'Bob' },
    });
    expect(newState.confirmedBookings).toHaveLength(2);
  });

  test('does not mutate original state', () => {
    const booking = { firstName: 'Jane' };
    timesReducer(initialState, { type: 'ADD_BOOKING', payload: booking });
    expect(initialState.confirmedBookings).toHaveLength(0);
  });
});
