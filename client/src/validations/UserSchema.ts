import * as z from 'zod';

export const UserDefaultValues: Partial<UserForm> = {
  id: 0
};

export const UserSchema: z.ZodType<Omit<UserForm, 'id'>> = z.object({
  name: z.string().min(1, { message: 'User name is required' }),
  email: z.z.string().email({ message: 'Email Addrssess is invalid' }),
  role: z.enum(['ADMIN', 'MANAGER'])
});
