import {describe, it, expect} from 'vitest';
import {pipe} from './pipe';

describe('pipe', () => {
  it('pipes functions left to right', () => {
    const addOne = (n: number) => n + 1;
    const double = (n: number) => n * 2;
    const square = (n: number) => n * n;

    const run = pipe(addOne, double, square);
    expect(run(3)).toBe(64);
  });

  it('returns the input when no functions are provided', () => {
    const run = pipe();
    expect(run('value')).toBe('value');
  });
});
