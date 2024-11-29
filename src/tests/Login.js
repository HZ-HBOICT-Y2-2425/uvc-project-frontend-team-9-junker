import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, expect } from 'vitest';
// @ts-expect-error - SvelteKit components can be imported without extension
import Login from '../routes/login/+page.svelte';
import { authStore } from '$lib/stores/authStore';
import { goto } from '$app/navigation';

vi.mock('$lib/stores/authStore', () => ({
  authStore: { set: vi.fn() },
}));

vi.mock('$app/navigation', () => ({
  goto: vi.fn(),
}));

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays success message and redirects on successful login', async () => {
    // Mock fetch API for successful login
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: 'test-token' }),
    });

    // Render the Login component
    render(Login);

    // Fill in the username and password fields
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.input(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    await fireEvent.click(submitButton);

    // Wait for login success
    await waitFor(() => {
      expect(screen.getByText(/login successful!/i)).toBeInTheDocument();
    });

    // Check store updates and navigation
    expect(authStore.set).toHaveBeenCalledWith({
      username: 'testuser',
      isAuthenticated: true,
      token: 'test-token',
    });

    expect(goto).toHaveBeenCalledWith('/');
  });

  it('displays error message on failed login', async () => {
    // Mock fetch API for failed login
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    // Render the Login component
    render(Login);

    // Fill in the username and password fields
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.input(passwordInput, { target: { value: 'wrongpassword' } });

    // Submit the form
    await fireEvent.click(submitButton);

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    // Ensure no store updates or redirects occurred
    expect(authStore.set).not.toHaveBeenCalled();
    expect(goto).not.toHaveBeenCalled();
  });

  it('displays error on network failure', async () => {
    // Mock fetch API to throw an error
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network Error'));

    // Render the Login component
    render(Login);

    // Fill in the username and password fields
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    await fireEvent.input(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    await fireEvent.click(submitButton);

    // Wait for network error message
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });

    // Ensure no store updates or redirects occurred
    expect(authStore.set).not.toHaveBeenCalled();
    expect(goto).not.toHaveBeenCalled();
  });
});
function beforeEach(arg0) {
  throw new Error('Function not implemented.');
}

