import { writable } from 'svelte/store';

export const toggleState = writable("swipe");
export const loadingState = writable(false);
export const darkModeEnabled = writable(false);
