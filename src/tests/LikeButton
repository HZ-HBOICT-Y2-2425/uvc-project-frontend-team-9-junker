// @ts-nocheck
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import LikeButton from "$lib/components/LikeButton.svelte"; // Adjust the import path if necessary
import { vi } from 'vitest';
import { unlikeItem } from './mocks/UserStore';

// Mock the stores
vi.mock('$lib/stores/authStore', () => import('./mocks/mockdataStore.js'));
vi.mock('$lib/stores/UserStore', () => import('./mocks/UserStore.js'));

// Test case
describe('LikeButton Component', () => {
  test('LikeButton state reacts to user.liked_items', async () => {
    // Mock item data
    const item = { id: 1 };

    // Render the component
    let { container } = render(LikeButton, { item });

    // Check the initial state (liked)
    const button = container.querySelector('button');
    //let heartIcon = button.querySelector('svg');
    //let heartIcon = screen.getByTestId('likedHeart');
    let fullHeartIcon = container.querySelector('#likedHeart');
    let emptyHeartIcon = container.querySelector('#unlikedHeart');
    expect(fullHeartIcon).not.toBeNull(); // Ensure SVG is rendered for liked state
    expect(emptyHeartIcon).toBeNull();

    // Simulate a click to unlike
    await fireEvent.click(button);

    // Wait for the state to update
    await waitFor(() => {
      // Re-query the heart icon for the updated state
      fullHeartIcon = container.querySelector('#likedHeart');
      emptyHeartIcon = container.querySelector('#unlikedHeart');
      expect(fullHeartIcon).toBeNull();
      expect(emptyHeartIcon).not.toBeNull();
    });

    // Verify `unlikeItem` was called
    expect(unlikeItem).toHaveBeenCalledWith(1, 1); // user ID and item ID
  });
});
