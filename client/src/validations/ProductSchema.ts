import * as z from 'zod';

export const ProductDefaultValues: Partial<ProductForm> = {};

export const ProductSchema: z.ZodType<ProductForm> = z.object({
  code: z.string().min(1, { message: 'Code is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  price: z.number().min(1, { message: 'Price required' }),
  stock: z.number().min(1, { message: 'Stock is required' })
});
