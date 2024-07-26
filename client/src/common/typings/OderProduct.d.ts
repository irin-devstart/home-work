interface OrderProduct {
  id: number;
  product: Pick<Product, 'id' | 'name'>;
  qty: number;
  price: number;
  totalPrice: number;
}
