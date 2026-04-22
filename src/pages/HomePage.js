import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const SPECIALS = [
  {
    name: 'Greek Salad',
    price: '$12.99',
    description: 'Fresh veggies, feta cheese, olives and our house vinaigrette dressing.',
    emoji: '🥗',
  },
  {
    name: 'Bruschetta',
    price: '$5.99',
    description: 'Grilled bread rubbed with garlic and topped with olive oil, salt and pepper.',
    emoji: '🥖',
  },
  {
    name: 'Lemon Dessert',
    price: '$4.50',
    description: 'This comes straight from grandma\'s recipe book — our most legendary dessert.',
    emoji: '🍋',
  },
];

const HomePage = () => (
  <main>
    {/* Hero */}
    <section className="hero" aria-label="Hero section">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1 className="hero-title">Little Lemon</h1>
          <h2 className="hero-subtitle">Chicago</h2>
          <p className="hero-description">
            We are a family-owned Mediterranean restaurant, focused on traditional recipes
            served with a modern twist. Come and experience the warmth of our kitchen.
          </p>
          <Link to="/reservations" className="btn btn-primary hero-cta">
            Reserve a Table
          </Link>
        </div>
        <div className="hero-image" aria-hidden="true">
          <div className="hero-img-placeholder">🍽️</div>
        </div>
      </div>
    </section>

    {/* Specials */}
    <section className="specials" aria-label="Weekly specials">
      <div className="container">
        <div className="specials-header">
          <h2>This Week's Specials!</h2>
          <Link to="/menu" className="btn btn-secondary">Online Menu</Link>
        </div>

        <ul className="specials-grid" role="list">
          {SPECIALS.map((item) => (
            <li key={item.name} className="special-card">
              <div className="card-emoji" aria-hidden="true">{item.emoji}</div>
              <div className="card-body">
                <div className="card-header-row">
                  <h3>{item.name}</h3>
                  <span className="card-price">{item.price}</span>
                </div>
                <p className="card-description">{item.description}</p>
                <a href="/order" className="card-link">Order a delivery →</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* About teaser */}
    <section className="about-teaser" aria-label="About Little Lemon">
      <div className="container about-inner">
        <div>
          <h2>About Little Lemon</h2>
          <p>
            Little Lemon opened its doors in 1995 as a small family bistro in Chicago.
            Over the decades, we have grown, but our commitment to authentic Mediterranean
            flavours and heartfelt hospitality has never changed.
          </p>
          <Link to="/about" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
            Our Story
          </Link>
        </div>
        <div className="about-emoji" aria-hidden="true">👨‍🍳</div>
      </div>
    </section>
  </main>
);

export default HomePage;
