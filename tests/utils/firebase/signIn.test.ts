import { describe, test, expect } from 'vitest';
import signIn from '@/utils/firebase/auth/signIn';

describe('signIn function', () => {
  const testUserEmail = 'snickers@gmail.com';
  const testUserPassword = 'Qwerty1!';

  test('signs in successfully with valid credentials', async () => {
    const { result, error } = await signIn(testUserEmail, testUserPassword);

    expect(error).toBe(null);
    expect(result).not.toBe(null);
  });

  test('fails to sign in with invalid credentials', async () => {
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'invalidPassword';

    const { error } = await signIn(invalidEmail, invalidPassword);

    expect(error).not.toBe(null);
  });
});
