interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CustomerForm
  extends Omit<Customer, 'id' | 'createdAt' | 'updatedAt'> {}
