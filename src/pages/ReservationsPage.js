import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { submitAPI } from '../context/BookingContext';
import { useBooking } from '../context/BookingContext';
import './ReservationsPage.css';

const ReservationsPage = () => {
  const navigate = useNavigate();
  const { addBooking } = useBooking();
  const [submitError, setSubmitError] = useState(null);

  const handleSubmitSuccess = (formValues) => {
    setSubmitError(null);
    const success = submitAPI(formValues);
    if (success) {
      addBooking(formValues);
      navigate('/confirmed', { state: { booking: formValues } });
    } else {
      setSubmitError('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="reservations-page">
      {/* Hero banner */}
      <section className="res-hero" aria-label="Reservations hero">
        <div className="container">
          <h1>Reserve a Table</h1>
          <p>Book your dining experience at Little Lemon — we'd love to have you.</p>
        </div>
      </section>

      <section className="res-body">
        <div className="container res-layout">
          {/* Form */}
          <div className="res-form-wrap">
            {submitError && (
              <div className="submit-error" role="alert">
                {submitError}
              </div>
            )}
            <BookingForm onSubmitSuccess={handleSubmitSuccess} />
          </div>

          {/* Sidebar info */}
          <aside className="res-info" aria-label="Restaurant information">
            <h2>Good to Know</h2>
            <ul>
              <li>📅 Bookings available up to 30 days in advance</li>
              <li>⏰ Dinner service: 5 PM – 10 PM daily</li>
              <li>👥 Groups over 10? Call us directly</li>
              <li>🐾 Pet-friendly outdoor patio available</li>
              <li>♿ Fully wheelchair accessible</li>
            </ul>

            <hr />

            <address>
              <strong>Little Lemon</strong><br />
              123 Lemon Street<br />
              Chicago, IL 60601<br />
              <a href="tel:+13125550192">(312) 555-0192</a>
            </address>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ReservationsPage;
