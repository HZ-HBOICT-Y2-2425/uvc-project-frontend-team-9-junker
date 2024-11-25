import { writable } from 'svelte/store';

// Shared store for saved listings
export const savedListingsStore = writable([]);

// Function to add a listing while ensuring no duplicates
export const addToSavedListings = (item) => {
  savedListingsStore.update((list) => {
    if (!list.some((savedItem) => savedItem.image === item.image)) {
      return [...list, item]; // Add the new item
    }
    return list; // Do nothing if it already exists
  });
};
