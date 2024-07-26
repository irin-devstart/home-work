interface Order {
  id: number;
  orderId: string;
  customer: Customer;
  interaction: OrderInteraction;
  status: OrderStatus;
  customerService: Pick<User, 'id' | 'name'>;
  date: Date;
  currency: idr;
  paymentMethod: PaymentMethod;
  receipt: string;
  cashBack: number;
  product: Array<OrderProduct>;
  turnover: number;
  shipping: number;
  grossProfit: number;
  CODTax: number;
  ppnCODTax: number;
  WHTTax: number;
  returnShippingCosts?: number;
  netProfit: number;
}
