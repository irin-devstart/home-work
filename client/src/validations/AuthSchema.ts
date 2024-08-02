import * as z from 'zod';

export const LoginSchema: z.ZodType<LoginAuth> = z.object({
  email: z.string().email({ message: 'Email Addrssess is invalid' }),
  password: z.string().min(6, { message: 'Password is required' })
});
