// @ts-nocheck
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import ViewSearch from "$lib/components/ViewSearch.svelte"; // Adjust the import path if necessary
import { vi } from 'vitest';
import { getAllItems } from './mocks/ItemStore';

// Mock the stores
vi.mock('$lib/stores/ItemStore', () => import('./mocks/ItemStore.js'));
vi.mock('$lib/stores/AllPurposeStore', () => import('./mocks/mockdataStore.js'));

// Test case
describe('ViewSearch Component', () => {
  test('Input element accepts inputs', async () => {

    // Render the component
    let { container } = render(ViewSearch);
    expect(container).not.toBeNull();

    const searchInput = container.querySelector('.search-input');
    expect(searchInput).not.toBeNull();

    // Simulate a click to unlike
    await fireEvent.focus(searchInput); //focus
    await fireEvent.input(searchInput, { target: { value: 'b' } });
    expect(searchInput.value).toBe('b');
  });
});
