import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { CartItemEntity } from './CartItem.entity';
import { CartStatuses } from '../cart/models';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ enum: CartStatuses, nullable: false, default: 'OPEN' })
  status: string;

  @OneToMany(() => OrderEntity, (cartItem) => cartItem.cart_id)
  @JoinColumn({ name: 'id' })
  orders: OrderEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  @JoinColumn({ name: 'id' })
  items: CartItemEntity[];
}