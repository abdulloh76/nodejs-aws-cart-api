import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CartEntity } from './Cart.entity';

@Entity()
export class CartItemEntity {
  @PrimaryColumn('uuid')
  cart_id: string;

  @PrimaryColumn('uuid')
  product_id: string;

  @Column()
  count: number;

  @CreateDateColumn({nullable: false})
  created_at: Date;

  @UpdateDateColumn({nullable: false})
  updated_at: Date;

  @ManyToOne(() => CartEntity, (cart) => cart.id)
  @JoinColumn({name: 'cart_id'})
  cart: CartEntity;
}