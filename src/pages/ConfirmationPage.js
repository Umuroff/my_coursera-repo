import React from 'react';
import { Link } from 'react-router-dom';
import './ConfirmationPage.css';

const ConfirmationPage = ({ booking }) => {
  if (!booking) {
    return (
      <main className="confirmation-page">
        <div className="container">
          <p>No booking found. <Link to="/reservations">Make a reservation</Link>.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="confirmation-page" aria-live="polite">
      <div className="container confirmation-inner">
        <div className="confirmation-icon" aria-hidden="true">🎉</div>
        <h1>Your Table is Reserved!</h1>
        <p className="confirmation-subtitle">
          Thank you, <strong>{booking.firstName}</strong>! We look forward to seeing you.
        </p>

        <section className="booking-summary" aria-label="Booking summary">
          <h2>Booking Details</h2>
          <dl className="summary-list">
            <div className="summary-row">
              <dt>Name</dt>
              <dd>{booking.firstName} {booking.lastName}</dd>
            </div>
            <div className="summary-row">
              <dt>Email</dt>
              <dd>{booking.email}</dd>
            </div>
            <div className="summary-row">
              <dt>Date</dt>
              <dd>{new Date(booking.date + 'T00:00').toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}</dd>
            </div>
            <div className="summary-row">
              <dt>Time</dt>
              <dd>{booking.time}</dd>
            </div>
            <div className="summary-row">
              <dt>Guests</dt>
              <dd>{booking.guests} {booking.guests === '1' ? 'guest' : 'guests'}</dd>
            </div>
            {booking.occasion && (
              <div className="summary-row">
                <dt>Occasion</dt>
                <dd>{booking.occasion}</dd>
              </div>
            )}
            {booking.specialRequests && (
              <div className="summary-row">
                <dt>Special Requests</dt>
                <dd>{booking.specialRequests}</dd>
              </div>
            )}
          </dl>
        </section>

        <p className="confirmation-note">
          A confirmation has been sent to <strong>{booking.email}</strong>.
        </p>

        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
};

export default ConfirmationPage;
