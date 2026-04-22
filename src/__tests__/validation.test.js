import { validateBookingForm, getTodayString } from '../utils/validation';

describe('validateBookingForm', () => {
  const validValues = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    date: '2099-12-31',
    time: '18:00',
    guests: '2',
    occasion: '',
    specialRequests: '',
  };

  test('returns no errors for valid data', () => {
    const errors = validateBookingForm(validValues);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  test('requires firstName', () => {
    const errors = validateBookingForm({ ...validValues, firstName: '' });
    expect(errors.firstName).toBeDefined();
  });

  test('requires lastName', () => {
    const errors = validateBookingForm({ ...validValues, lastName: '' });
    expect(errors.lastName).toBeDefined();
  });

  test('requires email', () => {
    const errors = validateBookingForm({ ...validValues, email: '' });
    expect(errors.email).toBeDefined();
  });

  test('rejects invalid email format', () => {
    const errors = validateBookingForm({ ...validValues, email: 'notanemail' });
    expect(errors.email).toBeDefined();
  });

  test('accepts valid email', () => {
    const errors = validateBookingForm({ ...validValues, email: 'user@domain.org' });
    expect(errors.email).toBeUndefined();
  });

  test('requires date', () => {
    const errors = validateBookingForm({ ...validValues, date: '' });
    expect(errors.date).toBeDefined();
  });

  test('rejects past date', () => {
    const errors = validateBookingForm({ ...validValues, date: '2000-01-01' });
    expect(errors.date).toBeDefined();
  });

  test('requires time', () => {
    const errors = validateBookingForm({ ...validValues, time: '' });
    expect(errors.time).toBeDefined();
  });

  test('requires guests', () => {
    const errors = validateBookingForm({ ...validValues, guests: '' });
    expect(errors.guests).toBeDefined();
  });

  test('rejects guests below 1', () => {
    const errors = validateBookingForm({ ...validValues, guests: '0' });
    expect(errors.guests).toBeDefined();
  });

  test('rejects guests above 10', () => {
    const errors = validateBookingForm({ ...validValues, guests: '11' });
    expect(errors.guests).toBeDefined();
  });

  test('accepts guests within range', () => {
    const errors = validateBookingForm({ ...validValues, guests: '5' });
    expect(errors.guests).toBeUndefined();
  });

  test('occasion is optional — no error when empty', () => {
    const errors = validateBookingForm({ ...validValues, occasion: '' });
    expect(errors.occasion).toBeUndefined();
  });
});

describe('getTodayString', () => {
  test('returns a string in YYYY-MM-DD format', () => {
    const result = getTodayString();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('returned date is today', () => {
    const result = getTodayString();
    const today = new Date().toISOString().split('T')[0];
    expect(result).toBe(today);
  });
});
