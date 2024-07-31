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

  @OneToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: CartEntity[];

  @Column({nullable: false})
  created_at: Date;

  @Column({nullable: false})
  updated_at: Date;
}