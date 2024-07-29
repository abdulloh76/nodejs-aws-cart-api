import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { CartEntity } from './Cart.entity';

@Entity()
export class CartItemEntity {
  @PrimaryColumn('uuid')
  cart_id: string;

  @PrimaryColumn('uuid')
  product_id: string;

  @Column()
  count: number;

  @ManyToOne(() => CartEntity, (cart) => cart.id)
  @JoinColumn({name: 'cart_id'})
  cart: CartEntity;
}