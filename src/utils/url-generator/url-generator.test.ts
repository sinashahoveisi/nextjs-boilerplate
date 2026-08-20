import {describe, it, expect} from 'vitest';
import {urlGenerator} from './url-generator';

describe('urlGenerator', () => {
  it('returns the url when version is not provided', () => {
    expect(urlGenerator('auth/login')).toBe('auth/login');
  });

  it('prefixes the url with a version segment', () => {
    expect(urlGenerator('auth/login', 1)).toBe('v1/auth/login');
    expect(urlGenerator('users', '2')).toBe('v2/users');
  });
});
