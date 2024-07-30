import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './User.entity';
import { CartEntity } from './Cart.entity';
import { Delivery, OrderStatuses, Payment } from '../order/models';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ enum: OrderStatuses, default: OrderStatuses.OPEN })
  status: string;

  @Column({ name: 'status_history', type: 'jsonb'})
  statusHistory: string;

  @Column()
  total: number;

  @CreateDateColumn({nullable: false})
  created_at: Date;

  @UpdateDateColumn({nullable: false})
  updated_at: Date;

  @ManyToOne(() => CartEntity, (cart) => cart.orders)
  @JoinColumn({name: 'cart_id'})
  cart: CartEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({name: 'user_id'})
  user: UserEntity;
}