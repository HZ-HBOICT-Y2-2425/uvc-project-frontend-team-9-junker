// @ts-nocheck
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { vi } from 'vitest';
import Register from '../routes/register/+page.svelte';

// Mock global fetch
global.fetch = vi.fn();

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays error if passwords do not match', async () => {
    render(Register);

    const passwordInput = screen.getByLabelText(/password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    // Fill in mismatched passwords
    await fireEvent.input(passwordInput, { target: { value: 'Password123!' } });
    await fireEvent.input(confirmPasswordInput, { target: { value: 'Password1234!' } });

    // Submit the form
    await fireEvent.click(submitButton);

    // Verify error message
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('displays error if age is less than 18', async () => {
    render(Register);

    const ageInput = screen.getByLabelText(/age/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    // Fill in age below 18
    await fireEvent.input(ageInput, { target: { value: '17' } });

    // Submit the form
    await fireEvent.click(submitButton);

    // Verify error message
    expect(screen.getByText(/you must be at least 18 years old to register/i)).toBeInTheDocument();
  });

  it('displays error if required checkboxes are not selected', async () => {
    render(Register);

    const submitButton = screen.getByRole('button', { name: /register/i });

    // Submit the form without checking the boxes
    await fireEvent.click(submitButton);

    // Verify error message
    expect(
      screen.getByText(
        /you must agree to the community guidelines and sustainability pledge/i
      )
    ).toBeInTheDocument();
  });

  it('registers successfully with valid input', async () => {
    // Mock successful API response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(Register);

    // Fill in the form with valid data
    await fireEvent.input(screen.getByLabelText(/full name/i), { target: { value: 'Test User' } });
    await fireEvent.input(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    await fireEvent.input(screen.getByLabelText(/age/i), { target: { value: '25' } });
    await fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });
    await fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' },
    });
    await fireEvent.click(screen.getByLabelText(/i agree to contribute positively/i));
    await fireEvent.click(screen.getByLabelText(/i pledge to use this platform/i));

    // Submit the form
    await fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });

    // Verify navigation to login
    expect(window.location.href).toContain('/login');
  });

  it('displays error on server error during registration', async () => {
    // Mock failed API response
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Username already exists' }),
    });

    render(Register);

    // Fill in the form with valid data
    await fireEvent.input(screen.getByLabelText(/full name/i), { target: { value: 'Test User' } });
    await fireEvent.input(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    await fireEvent.input(screen.getByLabelText(/age/i), { target: { value: '25' } });
    await fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });
    await fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' },
    });
    await fireEvent.click(screen.getByLabelText(/i agree to contribute positively/i));
    await fireEvent.click(screen.getByLabelText(/i pledge to use this platform/i));

    // Submit the form
    await fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/username already exists/i)).toBeInTheDocument();
    });
  });

  it('displays error on network failure', async () => {
    // Mock fetch to throw an error
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(Register);

    // Fill in the form with valid data
    await fireEvent.input(screen.getByLabelText(/full name/i), { target: { value: 'Test User' } });
    await fireEvent.input(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    await fireEvent.input(screen.getByLabelText(/age/i), { target: { value: '25' } });
    await fireEvent.input(screen.getByLabelText(/password/i), { target: { value: 'Password123!' } });
    await fireEvent.input(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' },
    });
    await fireEvent.click(screen.getByLabelText(/i agree to contribute positively/i));
    await fireEvent.click(screen.getByLabelText(/i pledge to use this platform/i));

    // Submit the form
    await fireEvent.click(screen.getByRole('button', { name: /register/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/an error occurred during registration/i)).toBeInTheDocument();
    });
  });
});
