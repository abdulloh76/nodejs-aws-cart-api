import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
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

  @Column({ enum: CartStatuses, nullable: false, default: 'OPEN' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.carts, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => OrderEntity, (order) => order.cart, { nullable: false }) 
  order: OrderEntity;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  @JoinColumn({ name: 'id' })
  items: CartItemEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}