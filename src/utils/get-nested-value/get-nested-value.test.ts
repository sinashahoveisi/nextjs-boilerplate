import {describe, it, expect} from 'vitest';
import {getNestedValue} from './get-nested-value';

describe('getNestedValue', () => {
  const data = {
    Auth: {
      login: 'Login',
      nested: {
        deep: 'value'
      }
    }
  };

  it('returns a top-level value', () => {
    expect(getNestedValue(data, 'Auth')).toEqual(data.Auth);
  });

  it('returns a nested value with dot notation', () => {
    expect(getNestedValue(data, 'Auth.login')).toBe('Login');
    expect(getNestedValue(data, 'Auth.nested.deep')).toBe('value');
  });

  it('returns undefined for missing paths', () => {
    expect(getNestedValue(data, 'Auth.missing')).toBeUndefined();
    expect(getNestedValue(data, 'Nope')).toBeUndefined();
  });
});
