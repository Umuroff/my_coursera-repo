import React, { useState } from 'react';
import { validateBookingForm, getTodayString } from '../utils/validation';
import { useBooking } from '../context/BookingContext';
import './BookingForm.css';

const OCCASIONS = ['Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Other'];

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  specialRequests: '',
};

const BookingForm = ({ onSubmitSuccess }) => {
  const { availableTimes, updateTimes } = useBooking();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Update available times when date changes
    if (name === 'date' && value) {
      updateTimes(value);
    }

    // Live validate if field was already touched
    if (touched[name]) {
      const newErrors = validateBookingForm({ ...values, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateBookingForm(values);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const validationErrors = validateBookingForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmitSuccess(values);
    }
  };

  const fieldError = (name) => touched[name] && errors[name];

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      aria-label="Reserve a table at Little Lemon"
      noValidate
    >
      <fieldset className="form-section">
        <legend>Personal Details</legend>

        <div className="form-row">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span aria-hidden="true" className="required">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jane"
              autoComplete="given-name"
              aria-required="true"
              aria-describedby={fieldError('firstName') ? 'firstName-error' : undefined}
              aria-invalid={!!fieldError('firstName')}
              className={fieldError('firstName') ? 'input-error' : ''}
            />
            {fieldError('firstName') && (
              <span id="firstName-error" className="error-message" role="alert">
                {errors.firstName}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">
              Last Name <span aria-hidden="true" className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Smith"
              autoComplete="family-name"
              aria-required="true"
              aria-describedby={fieldError('lastName') ? 'lastName-error' : undefined}
              aria-invalid={!!fieldError('lastName')}
              className={fieldError('lastName') ? 'input-error' : ''}
            />
            {fieldError('lastName') && (
              <span id="lastName-error" className="error-message" role="alert">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">
            Email Address <span aria-hidden="true" className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="jane@example.com"
            autoComplete="email"
            aria-required="true"
            aria-describedby={fieldError('email') ? 'email-error' : undefined}
            aria-invalid={!!fieldError('email')}
            className={fieldError('email') ? 'input-error' : ''}
          />
          {fieldError('email') && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </fieldset>

      <fieldset className="form-section">
        <legend>Reservation Details</legend>

        <div className="form-row">
          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">
              Date <span aria-hidden="true" className="required">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              min={getTodayString()}
              aria-required="true"
              aria-describedby={fieldError('date') ? 'date-error' : undefined}
              aria-invalid={!!fieldError('date')}
              className={fieldError('date') ? 'input-error' : ''}
            />
            {fieldError('date') && (
              <span id="date-error" className="error-message" role="alert">
                {errors.date}
              </span>
            )}
          </div>

          {/* Time */}
          <div className="form-group">
            <label htmlFor="time">
              Time <span aria-hidden="true" className="required">*</span>
            </label>
            <select
              id="time"
              name="time"
              value={values.time}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-describedby={fieldError('time') ? 'time-error' : undefined}
              aria-invalid={!!fieldError('time')}
              className={fieldError('time') ? 'input-error' : ''}
            >
              <option value="">Select a time</option>
              {availableTimes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {fieldError('time') && (
              <span id="time-error" className="error-message" role="alert">
                {errors.time}
              </span>
            )}
          </div>
        </div>

        <div className="form-row">
          {/* Guests */}
          <div className="form-group">
            <label htmlFor="guests">
              Number of Guests <span aria-hidden="true" className="required">*</span>
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              value={values.guests}
              onChange={handleChange}
              onBlur={handleBlur}
              min="1"
              max="10"
              aria-required="true"
              aria-describedby={
                fieldError('guests') ? 'guests-error' : 'guests-hint'
              }
              aria-invalid={!!fieldError('guests')}
              className={fieldError('guests') ? 'input-error' : ''}
            />
            <span id="guests-hint" className="field-hint">
              1–10 guests per booking
            </span>
            {fieldError('guests') && (
              <span id="guests-error" className="error-message" role="alert">
                {errors.guests}
              </span>
            )}
          </div>

          {/* Occasion */}
          <div className="form-group">
            <label htmlFor="occasion">Occasion (optional)</label>
            <select
              id="occasion"
              name="occasion"
              value={values.occasion}
              onChange={handleChange}
            >
              <option value="">— None —</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Special Requests */}
        <div className="form-group">
          <label htmlFor="specialRequests">Special Requests (optional)</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={values.specialRequests}
            onChange={handleChange}
            rows={3}
            placeholder="Allergies, dietary restrictions, seating preferences..."
            aria-describedby="requests-hint"
          />
          <span id="requests-hint" className="field-hint">
            We'll do our best to accommodate your requests.
          </span>
        </div>
      </fieldset>

      <p className="required-note">
        <span className="required">*</span> Required fields
      </p>

      <button type="submit" className="btn btn-primary submit-btn" aria-label="Submit reservation">
        Reserve a Table
      </button>
    </form>
  );
};

export default BookingForm;
