import {describe, it, expect, beforeEach} from 'vitest';
import {saveToStorage, getFromStorage, deleteFromStorage} from './storage';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and reads values', () => {
    saveToStorage('user', {id: 1, name: 'Sina'});
    expect(getFromStorage('user')).toEqual({id: 1, name: 'Sina'});
  });

  it('deletes values', () => {
    saveToStorage('token', 'abc');
    deleteFromStorage('token');
    expect(getFromStorage('token')).toBeFalsy();
  });
});
