import { Entity, Column, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { CartEntity } from './Cart.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('uuid')
  cart_id: string;

  @PrimaryColumn('uuid')
  product_id: string;

  @Column()
  count: number;

  @ManyToOne(() => CartEntity, (cart) => cart.items, { nullable: false })
  @JoinColumn({name: 'cart_id'})
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cartItem, { nullable: false })
  @JoinColumn({name: 'product_id'})
  product: ProductEntity;

  @CreateDateColumn({nullable: false})
  created_at: Date;

  @UpdateDateColumn({nullable: false})
  updated_at: Date;
}