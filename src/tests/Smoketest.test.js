// @ts-nocheck
import { render } from '@testing-library/svelte';
import {expect, test} from 'vitest'

import App from '../routes/+layout.svelte';
import Login from '../routes/login/+page.svelte'
import Register from '../routes/register/+page.svelte'

test('Junker App renders without crashing', () => {
  const { container } = render(App);
  expect(container).toBeInTheDocument(); // Ensures the app renders into the DOM
});

test('Login component renders without crashing', () => {
    const { container } = render(Login);
    expect(container).toBeInTheDocument();
});

test('Register component renders without crashing', () => {
    const { container } = render(Register);
    expect(container).toBeInTheDocument();
});