/*
*  Will be split up later
*/

import { writable } from 'svelte/store';

export const toggleState = writable("search");

export const loadingState = writable(false);