import { Entity, Column, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { CartEntity } from './Cart.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryColumn('uuid')
  id: string;

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

  @ManyToOne(() => CartEntity, (cart) => cart.items, { nullable: false })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({name: 'product_id'})
  product: ProductEntity;
}