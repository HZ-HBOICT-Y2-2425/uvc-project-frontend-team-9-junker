import { writable } from 'svelte/store';

// Store for liked items
export const likedItemsStore = writable([]);

// Log updates to the store
likedItemsStore.subscribe((items) => console.log('Liked Items in Store:', items));
