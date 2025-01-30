// @ts-nocheck
import { vi } from 'vitest';
import { items } from './mockdataStore'

export const getAllItems = vi.fn(() => Promise.resolve(items));