interface OrderItem {
  id: number;
  qty: number;
  price: number;
  totalPrice: number;
  productId: number;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItemForm
  extends Omit<OrderItem, 'product' | 'createdAt' | 'updatedAt' | 'id'> {
  productName: string;
}
