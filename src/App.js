import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ReservationsPage from './pages/ReservationsPage';
import ConfirmationPage from './pages/ConfirmationPage';
import { BookingProvider } from './context/BookingContext';

// Simple stub pages for nav links
const SimplePage = ({ title }) => (
  <main style={{ padding: '4rem 0', minHeight: '50vh' }}>
    <div className="container">
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-green)' }}>
        {title}
      </h1>
      <p style={{ marginTop: '1rem', color: '#555' }}>Coming soon...</p>
    </div>
  </main>
);

// Confirmation needs booking state passed via router location
const ConfirmationWrapper = () => {
  const location = useLocation();
  const booking = location.state?.booking || null;
  return <ConfirmationPage booking={booking} />;
};

function App() {
  return (
    <BookingProvider>
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<SimplePage title="About Us" />} />
            <Route path="/menu" element={<SimplePage title="Our Menu" />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/order" element={<SimplePage title="Order Online" />} />
            <Route path="/confirmed" element={<ConfirmationWrapper />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '4rem 0', textAlign: 'center', minHeight: '50vh' }}>
                  <div className="container">
                    <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-green)', fontSize: '3rem' }}>
                      404
                    </h1>
                    <p style={{ margin: '1rem 0', color: '#555' }}>Page not found.</p>
                    <a href="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                      Go Home
                    </a>
                  </div>
                </main>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
