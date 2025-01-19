// @ts-nocheck
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import ImageViewer from "$lib/components/ImageViewer.svelte"; // Adjust the import path if necessary
import { vi } from 'vitest';
import { pictures } from './mocks/mockdataStore';

// Test case
describe('ImageViewer Component', () => {
  test('ImageViewer displays images', async () => {
    // Render the component
    let { container } = render(ImageViewer, { pictures });

    // Check the initial state (liked)
    const img = container.querySelector('img');
    expect(img).not.toBeNull(); // Ensure IMG is rendered
  });
});
