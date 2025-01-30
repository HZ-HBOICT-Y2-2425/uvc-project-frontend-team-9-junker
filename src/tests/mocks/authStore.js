// @ts-nocheck
import { writable } from 'svelte/store';

// Create a mock `authStore`
export const authStore = writable({
  user: {
    id: 1,
    liked_items: [1, 2],
    disliked_items: [],
  },
});

// Export the mocked module
export default {
  authStore: authStore,
};
