import * as z from 'zod';

export const CustomerDefaultValues: Partial<CustomerForm> = {};

export const CustomerSchema: z.ZodType<CustomerForm> = z.object({
  name: z.string().min(1, { message: 'Customer name is required' }),
  phone: z.string().refine((arg) => arg.toString().length > 10, {
    message: 'Must be longer than 10 characters'
  }),
  email: z.union([
    z.string().email({ message: 'Email Addrssess is invalid' }),
    z.literal('')
  ]),
  address: z.string().optional()
});
