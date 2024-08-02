interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductForm extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {}
