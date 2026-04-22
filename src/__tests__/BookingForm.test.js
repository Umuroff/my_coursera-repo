import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { BookingProvider } from '../context/BookingContext';

// Helper: renders form inside required providers
const renderForm = (onSubmitSuccess = jest.fn()) =>
  render(
    <MemoryRouter>
      <BookingProvider>
        <BookingForm onSubmitSuccess={onSubmitSuccess} />
      </BookingProvider>
    </MemoryRouter>
  );

describe('BookingForm rendering', () => {
  test('renders the form with all required fields', () => {
    renderForm();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  test('renders the submit button', () => {
    renderForm();
    expect(screen.getByRole('button', { name: /reserve a table/i })).toBeInTheDocument();
  });

  test('form has accessible label', () => {
    renderForm();
    expect(screen.getByRole('form', { name: /reserve a table/i })).toBeInTheDocument();
  });
});

describe('BookingForm validation', () => {
  test('shows errors when submitting empty form', async () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /reserve a table/i }));
    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
    });
  });

  test('shows error for invalid email', async () => {
    renderForm();
    await userEvent.type(screen.getByLabelText(/email/i), 'notvalid');
    fireEvent.blur(screen.getByLabelText(/email/i));
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
  });

  test('shows error for guests above 10', async () => {
    renderForm();
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '15');
    fireEvent.blur(guestsInput);
    await waitFor(() => {
      expect(screen.getByText(/maximum 10 guests/i)).toBeInTheDocument();
    });
  });

  test('clears error when field is corrected', async () => {
    renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'bad');
    fireEvent.blur(emailInput);
    await waitFor(() => expect(screen.getByText(/valid email/i)).toBeInTheDocument());

    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'good@email.com');
    fireEvent.blur(emailInput);
    await waitFor(() => expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument());
  });
});

describe('BookingForm submission', () => {
  test('calls onSubmitSuccess with form data when valid', async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);

    await userEvent.type(screen.getByLabelText(/first name/i), 'Jane');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Smith');
    await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');

    // Set date to future date
    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2099-12-31' } });

    // Select first available time
    const timeSelect = screen.getByLabelText(/time/i);
    const options = timeSelect.querySelectorAll('option:not([value=""])');
    if (options.length > 0) {
      fireEvent.change(timeSelect, { target: { value: options[0].value } });
    }

    fireEvent.click(screen.getByRole('button', { name: /reserve a table/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
        })
      );
    });
  });

  test('does not call onSubmitSuccess when form is invalid', async () => {
    const mockSubmit = jest.fn();
    renderForm(mockSubmit);
    fireEvent.click(screen.getByRole('button', { name: /reserve a table/i }));
    await waitFor(() => expect(mockSubmit).not.toHaveBeenCalled());
  });
});
