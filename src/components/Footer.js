import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer" role="contentinfo">
    <div className="container footer-inner">
      <div className="footer-brand">
        <span className="footer-logo">🍋 Little Lemon</span>
        <p>A family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
      </div>

      <nav aria-label="Footer navigation" className="footer-nav">
        <h3>Navigation</h3>
        <ul>
          {['Home', 'About', 'Menu', 'Reservations', 'Order Online'].map((item) => (
            <li key={item}>
              <Link to={`/${item.toLowerCase().replace(' ', '')}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <address className="footer-contact">
        <h3>Contact</h3>
        <p>123 Lemon Street<br />Chicago, IL 60601</p>
        <p><a href="tel:+13125550192">(312) 555-0192</a></p>
        <p><a href="mailto:hello@littlelemon.com">hello@littlelemon.com</a></p>
      </address>
    </div>

    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
