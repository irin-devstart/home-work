import { AlertDialogProps } from '@components/organisms';

export const alertDialogDummy: AlertDialogProps = {
  open: false,
  description: '',
  title: '',
  type: 'confirm'
};
export const orderItemDummy: OrderItemForm = {
  price: 0,
  productId: 0,
  productName: '',
  qty: 0,
  totalPrice: 0
};

export const userDummy: Omit<User, 'password'> ={
  id: 0,
  email: '',
  isActive: false,
  name:'',
  role: 'ADMIN'
}