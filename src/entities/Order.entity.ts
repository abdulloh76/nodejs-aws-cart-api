import { Entity, Column, PrimaryGeneratedColumn, RelationId, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './User.entity';
import { CartEntity } from './Cart.entity';
import { CartItemEntity } from './CartItem.entity';
import { Delivery, Payment } from 'src/order';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  user_id: string;

  @Column()
  cart_id: string;

  @Column({type: 'jsonb'})
  payment: Payment;

  @Column({type: 'jsonb'})
  delivery: Delivery;

  @Column()
  comments: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ name: 'status_history', type: 'jsonb'})
  statusHistory: string;

  @Column()
  total: number;

  @ManyToOne(() => CartEntity, (cart) => cart.orders)
  @JoinColumn({name: 'cart_id'})
  cart: CartEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;
}