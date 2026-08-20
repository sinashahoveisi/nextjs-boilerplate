import {describe, it, expect} from 'vitest';
import {translation} from './translate';

describe('translation', () => {
  it('returns translated values for known keys', () => {
    const t = translation('Auth');
    expect(t('login')).toBe('Login');
    expect(t('phoneNumber')).toBe('Phone number');
  });

  it('returns nested validation messages', () => {
    const t = translation('Validation');
    expect(t('phoneNumber.required')).toBe('Phone number is required');
    expect(t('password.match')).toBe('Password and confirmation must match');
  });

  it('returns the key when translation is missing', () => {
    const t = translation('Auth');
    expect(t('missing.key')).toBe('missing.key');
  });
});
