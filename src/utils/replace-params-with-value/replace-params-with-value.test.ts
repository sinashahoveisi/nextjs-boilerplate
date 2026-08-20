import {describe, it, expect} from 'vitest';
import {replaceParamsWithValue} from './replace-params-with-value';

describe('replaceParamsWithValue', () => {
  it('replaces placeholders with values', () => {
    expect(replaceParamsWithValue('/post/{id}', {id: 5})).toBe('/post/5');
    expect(replaceParamsWithValue('/{lang}/users/{id}', {lang: 'en', id: '10'})).toBe('/en/users/10');
  });

  it('returns the original string when params are missing', () => {
    expect(replaceParamsWithValue('/post/{id}')).toBe('/post/{id}');
  });
});
