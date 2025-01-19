// @ts-nocheck
import { vi } from 'vitest';

export const likeItem = vi.fn(() => Promise.resolve('Likes updated successfully'));
export const unlikeItem = vi.fn(() => Promise.resolve('Likes updated successfully'));
export const undislikeItem = vi.fn(() => Promise.resolve());


