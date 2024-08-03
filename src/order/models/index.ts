import { CartItem } from '../../cart/models';

export enum OrderStatuses {
  OPEN = 'OPEN',
  APPROVED = 'APPROVED',
  CONFIRMED = 'CONFIRMED',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

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