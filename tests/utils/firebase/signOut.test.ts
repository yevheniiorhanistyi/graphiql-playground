import { describe, test, expect } from 'vitest';
import signOut from '@/utils/firebase/auth/signOut';

describe('signOut function', () => {
  test('signs out successfully', async () => {
    const { result, error } = await signOut();

    expect(error).toBe(null);
    expect(result).toBe(undefined);
  });
});
