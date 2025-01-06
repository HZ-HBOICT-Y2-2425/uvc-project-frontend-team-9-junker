/*
import { writable } from 'svelte/store';

export const authStore = writable({
  username: 'null',
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: []
});
*/

import { writable } from 'svelte/store';
import { User } from '$lib/models/User';

export const authStore = writable({
  username: 'null',
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: []
});
