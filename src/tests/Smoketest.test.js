// @ts-nocheck
import { render } from '@testing-library/svelte';
import {expect, test} from 'vitest'

import App from '../routes/+layout.svelte';
import Login from '../routes/login/+page.svelte'
import Register from '../routes/register/+page.svelte'

test('Smoketest 1/3: Junker App renders without crashing', () => {
  const { container } = render(App);
  expect(container).toBeInTheDocument(); // Ensures the app renders into the DOM
});

test('Smoketest 2/3: Login component renders without crashing', () => {
    const { container } = render(Login);
    expect(container).toBeInTheDocument();
});

test('Smoketest 3/3: Register component renders without crashing', () => {
    const { container } = render(Register);
    expect(container).toBeInTheDocument();
});