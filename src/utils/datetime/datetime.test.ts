import {describe, it, expect} from 'vitest';
import {toFormatDateTime} from './datetime';

describe('toFormatDateTime', () => {
  it('formats a date string', () => {
    const result = toFormatDateTime('2024-01-15T10:30:00Z');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('accepts custom options', () => {
    const result = toFormatDateTime('2024-01-15T10:30:00Z', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    expect(result).toContain('2024');
  });
});
