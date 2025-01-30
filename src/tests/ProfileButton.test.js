// @ts-nocheck
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import ProfileButton from "$lib/components/ProfileButton.svelte"; // Adjust the import path if necessary
import { vi } from 'vitest';
import { unlikeItem } from './mocks/UserStore';

// Mock the stores
vi.mock('$lib/stores/authStore', () => import('./mocks/mockdataStore.js'));

// Test case
describe('ProfileButton Component', () => {
  test('ProfileButton implements image from user.profile_pic', async () => {

    // Render the component
    let { container } = render(ProfileButton);

    // Check the initial state (liked)
    const button = container.querySelector('button');
    //let heartIcon = button.querySelector('svg');
    //let heartIcon = screen.getByTestId('likedHeart');
    let pfp = button.querySelector('img');
    let svg = button.querySelector('svg');
    let emptyHeartIcon = container.querySelector('#unlikedHeart');
    expect(pfp).not.toBeNull(); // Ensure IMG is rendered
    expect(svg).toBeNull();
  });
});
