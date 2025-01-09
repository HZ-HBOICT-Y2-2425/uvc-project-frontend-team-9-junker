import { writable } from 'svelte/store';

export const authStore = writable({
  username: 'null',
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: [],
  liked_items: [undefined],
  disliked_items: [undefined],
});
