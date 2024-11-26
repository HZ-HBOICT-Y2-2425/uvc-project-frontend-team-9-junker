import { writable } from 'svelte/store';
import { Community } from '$lib/models/Community.js';

export const toggleState = writable("swipe");
export const loadingState = writable(false);
export const darkModeEnabled = writable(false);
export const savedListingsStore = writable('username');