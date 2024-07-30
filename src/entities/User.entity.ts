import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { CartEntity } from './Cart.entity';

@Entity('users')
export class UserEntity  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: false})
  created_at: Date;

  @Column({nullable: false})
  updated_at: Date;

  @OneToMany(() => OrderEntity, (cartItems) => cartItems.cart_id)
  @JoinColumn({name: 'id'})
  orders: OrderEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.user_id)
  @JoinColumn({name: 'id'})
  carts: CartEntity[];
}