interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: Array<{
    currency: string;
    country: string;
    price: number;
  }>;
}
