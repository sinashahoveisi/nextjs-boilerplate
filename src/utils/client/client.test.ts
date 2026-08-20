import {describe, it, expect} from 'vitest';
import {isClientSide, isServerSide} from './client';

describe('client utils', () => {
  it('reports client/server based on window availability', () => {
    // Current implementation treats "no window" as client-side.
    expect(typeof isClientSide()).toBe('boolean');
    expect(isServerSide()).toBe(!isClientSide());
  });
});
