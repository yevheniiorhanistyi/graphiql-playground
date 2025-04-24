import { describe, test, expect } from 'vitest';

import { signInFormSchema, signUpFormSchema } from '@/utils/FormsSchema';

describe('Validation Schemas', () => {
  describe('signInFormSchema', () => {
    test('validates email and password correctly', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const invalidData = {
        email: 'invalid-email',
        password: 'short',
      };

      await expect(signInFormSchema.validate(validData)).resolves.toBe(validData);
      await expect(signInFormSchema.validate(invalidData)).rejects.toThrow();
    });
  });

  describe('signUpFormSchema', () => {
    test('validates password and passwordConfirmation correctly', async () => {
      const validData = {
        email: 'test@example.com',
        password: 'StrongPassword123!',
        passwordConfirmation: 'StrongPassword123!',
      };

      const invalidData = {
        email: 'test@example.com',
        password: 'weak',
        passwordConfirmation: 'invalid',
      };

      await expect(signUpFormSchema.validate(validData)).resolves.toBe(validData);
      await expect(signUpFormSchema.validate(invalidData)).rejects.toThrow();
    });
  });
});
