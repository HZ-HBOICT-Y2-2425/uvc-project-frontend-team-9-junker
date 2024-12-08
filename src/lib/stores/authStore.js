import { writable } from 'svelte/store';

export const authStore = writable({
  username: 'null',
  isAuthenticated: false,
  token: null,
  user: []
});
