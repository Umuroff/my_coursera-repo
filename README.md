# 🍋 Little Lemon — Table Reservation App

A React web application for the **Little Lemon** Mediterranean restaurant, built as the capstone project for the **Meta Front-End Developer Professional Certificate** on Coursera.

---

## 📋 Overview

Users can:
- Browse the restaurant homepage with weekly specials
- Navigate to the **Reservations** page
- Fill in and submit a **table booking form** with full validation
- See a **confirmation page** with their booking summary

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| React Context + useReducer | State management |
| CSS Modules (plain CSS) | Styling |
| Jest + React Testing Library | Unit & integration tests |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/little-lemon.git

# 2. Navigate to the project folder
cd little-lemon

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will open at **http://localhost:3000**.

---

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage
```

### Test Coverage

| File | What's tested |
|---|---|
| `validation.test.js` | All field validation rules, edge cases |
| `BookingContext.test.js` | `fetchAPI`, `timesReducer` (UPDATE_TIMES, ADD_BOOKING) |
| `BookingForm.test.js` | Rendering, validation errors, successful submission |
| `App.test.js` | App mounts without crashing |

---

## 📁 Project Structure

```
src/
├── __tests__/
│   ├── App.test.js
│   ├── BookingContext.test.js
│   ├── BookingForm.test.js
│   └── validation.test.js
├── components/
│   ├── BookingForm.js      # Table booking form with validation
│   ├── BookingForm.css
│   ├── Nav.js              # Responsive navigation header
│   ├── Nav.css
│   ├── Footer.js
│   └── Footer.css
├── context/
│   └── BookingContext.js   # fetchAPI, submitAPI, useReducer state
├── pages/
│   ├── HomePage.js         # Landing page with hero & specials
│   ├── HomePage.css
│   ├── ReservationsPage.js # Booking page
│   ├── ReservationsPage.css
│   ├── ConfirmationPage.js # Post-booking confirmation
│   └── ConfirmationPage.css
├── utils/
│   └── validation.js       # Pure validation functions
├── App.js                  # Router & layout
└── index.css               # Global styles & CSS variables
```

---

## ✅ Coursera Rubric Checklist

| Criterion | Status |
|---|---|
| UX/UI design implemented | ✅ Little Lemon branding, responsive layout |
| Accessibility tags applied | ✅ `aria-label`, `aria-required`, `aria-invalid`, `aria-describedby`, `role="alert"`, semantic HTML |
| Unit/integration tests | ✅ 20+ tests across 4 test files |
| Booking form with validation | ✅ Real-time validation, error messages, edge cases |
| Semantic & responsive HTML | ✅ `<main>`, `<nav>`, `<header>`, `<footer>`, `<section>`, `<aside>`, CSS Grid/Flexbox |
| Git repository | ✅ Committed to GitHub |
| Clean, maintainable code | ✅ Components separated, JSDoc-style comments |
| Edge cases & error messages | ✅ Empty fields, invalid email, past dates, out-of-range guests |
| README & setup instructions | ✅ This file |

---

## ♿ Accessibility Features

- All form inputs have associated `<label>` elements
- `aria-required="true"` on mandatory fields
- `aria-invalid` set dynamically on validation failure
- `aria-describedby` links inputs to their error messages
- Error messages use `role="alert"` for screen reader announcements
- `aria-live="polite"` on the confirmation page
- Keyboard-navigable hamburger menu with `aria-expanded`
- Focus-visible outlines on all interactive elements
- Semantic landmark elements throughout (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`)

---

## 📸 Screenshots

> Add screenshots here after running the app locally.

---

## 📄 License

This project was created for educational purposes as part of the Meta Front-End Developer course on Coursera.
