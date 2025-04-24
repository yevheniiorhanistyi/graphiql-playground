import { describe, test, expect } from 'vitest';
import signUp from '@/utils/firebase/auth/signUp';

describe('signUp function', () => {
  const testUserEmail = 'test@example.com';
  const testUserPassword = 'testPassword12!';

  test('fails to sign up with existing email', async () => {
    await signUp(testUserEmail, 'someRandomPassword');

    const { error } = await signUp(testUserEmail, testUserPassword);

    expect(error).not.toBe(null);
  });
});
