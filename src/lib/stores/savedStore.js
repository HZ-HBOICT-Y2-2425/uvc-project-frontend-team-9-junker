import { writable } from 'svelte/store';

// Shared store for saved listings
export const savedListingsStore = writable([]);
