import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { CartItemEntity } from './CartItem.entity';
import { CartStatuses } from '../cart/models';
import { UserEntity } from './User.entity';

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

  @OneToMany(() => OrderEntity, (cartItems) => cartItems.cart_id)
  @JoinColumn({ name: 'id' })
  orders: OrderEntity[];

  @OneToMany(() => CartItemEntity, (cartItems) => cartItems.cart_id)
  @JoinColumn({ name: 'id' })
  items: CartItemEntity[];

  @ManyToOne(() => UserEntity, (user) => user.carts, { nullable: false })
  user: UserEntity;
}