import { CartItem } from '../../cart/models';

export type Order = {
  id?: string,
  userId: string;
  cartId: string;
  items: CartItem[]
  payment: Payment,
  delivery: Delivery,
  comments: string,
  status: string;
  total: number;
}

export type Payment = {
  type: string,
  address?: any,
  creditCard?: any,
}

export type Delivery = {
  type: string,
  address: any,
}