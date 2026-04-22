import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Little Lemon app without crashing', () => {
  render(<App />);
  // Nav logo should appear
  expect(screen.getByText(/little lemon/i)).toBeInTheDocument();
});

test('renders home page hero section', () => {
  render(<App />);
  expect(screen.getByText(/reserve a table/i)).toBeInTheDocument();
});
