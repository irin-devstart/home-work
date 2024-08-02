import * as z from 'zod';

export const OrderDefaultValues: Partial<OrderForm> = {
  customerId: 0,
  customerName: '',
  orderDate: new Date(),
  totalPrice: 0
};

export const OrderSchema: z.ZodType<OrderForm> = z.object({
  customerId: z.number().positive({ message: 'Please select product' }),
  customerName: z.string(),
  orderDate: z.date(),
  totalPrice: z.number().positive({ message: 'Price is required' }),
  orderItem: z.object({
    qty: z.number().positive({ message: 'Qty is required' }),
    price: z.number().positive({ message: 'Price is required' }),
    productId: z.number().positive({ message: 'Please select product' }),
    productName: z.string(),
    totalPrice: z.number().positive({ message: 'Total price is required' })
  }),
  orderItemsFinal: z
    .object({
      id: z.number(),
      qty: z.number(),
      price: z.number(),
      productId: z.number(),
      productName: z.string(),
      totalPrice: z.number()
    })
    .array()
    .nonempty({
      message: 'Please select order items'
    })
});
