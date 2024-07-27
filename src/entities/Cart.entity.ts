import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { CartItemEntity } from './CartItem.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({nullable: false})
  user_id: string;

  @Column({ nullable: false })
  created_at: Date;

  @Column({ nullable: false })
  updated_at: Date;

  @Column({enum: ['OPEN', 'ORDERED'], nullable: false, default: 'OPEN'})
  status: string;

  @OneToMany(() => OrderEntity, (cartItems) => cartItems.cart_id)
  @JoinColumn({name: 'id'})
  orders: OrderEntity[];
  
  @OneToMany(() => CartItemEntity, (cartItems) => cartItems.cart_id)
  @JoinColumn({name: 'id'})
  cartItems: CartItemEntity[];
}