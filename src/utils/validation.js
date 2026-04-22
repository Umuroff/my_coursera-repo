/**
 * Validates booking form fields.
 * Returns an errors object; empty object means valid.
 */
export const validateBookingForm = (values) => {
  const errors = {};

  // Date: required, must not be in the past
  if (!values.date) {
    errors.date = 'Please select a date.';
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(values.date) < today) {
      errors.date = 'Date cannot be in the past.';
    }
  }

  // Time: required
  if (!values.time) {
    errors.time = 'Please select a time.';
  }

  // Guests: required, 1–10
  if (!values.guests) {
    errors.guests = 'Please enter the number of guests.';
  } else {
    const n = parseInt(values.guests, 10);
    if (isNaN(n) || n < 1) {
      errors.guests = 'At least 1 guest is required.';
    } else if (n > 10) {
      errors.guests = 'Maximum 10 guests per booking.';
    }
  }

  // Occasion: optional — no validation needed
  // First name
  if (!values.firstName || values.firstName.trim() === '') {
    errors.firstName = 'First name is required.';
  }

  // Last name
  if (!values.lastName || values.lastName.trim() === '') {
    errors.lastName = 'Last name is required.';
  }

  // Email: required + basic format check
  if (!values.email) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return errors;
};

/**
 * Returns today's date as YYYY-MM-DD for the date input min attribute.
 */
export const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};
