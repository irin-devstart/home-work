interface Order {
  id: number;
  customerId: number;
  orderDate: Date;
  totalPrice: number;
  customer: Customer;
  OrderItem: Array<OrderItem>;
  status: OrderStatus;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderForm
  extends Pick<Order, 'customerId' | 'orderDate' | 'totalPrice'> {
  orderItem: OrderItemForm;
  customerName: string;
  orderItemsFinal: Array<OrderItemForm & { id: number }>;
}

interface OrderUpdateStatus extends Pick<Order, 'id' | 'status'> {}
