import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { CartItemEntity } from './CartItem.entity';

@Entity()
export class UserEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderEntity, (cartItems) => cartItems.cart_id)
  @JoinColumn({name: 'id'})
  orders: OrderEntity[];
}