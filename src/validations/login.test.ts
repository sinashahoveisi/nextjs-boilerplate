import {describe, it, expect} from 'vitest';
import {loginValidationSchema} from './login';

describe('loginValidationSchema', () => {
  it('accepts a valid payload', async () => {
    await expect(
      loginValidationSchema.validate({
        phoneNumber: '09123456789',
        password: 'secret'
      })
    ).resolves.toMatchObject({
      phoneNumber: '09123456789',
      password: 'secret'
    });
  });

  it('requires phone number and password', async () => {
    await expect(loginValidationSchema.validate({})).rejects.toThrow();
  });

  it('requires an 11-digit phone number', async () => {
    await expect(
      loginValidationSchema.validate({
        phoneNumber: '123',
        password: 'secret'
      })
    ).rejects.toThrow(/11 digits/i);
  });
});
