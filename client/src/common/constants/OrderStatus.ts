export const orderStatus: Record<OrderStatus, OrderStatus> = {
  PENDING: 'PENDING',
  SHIPPED: 'SHIPPED',
  DELIVERY: 'DELIVERY'
} as const;
