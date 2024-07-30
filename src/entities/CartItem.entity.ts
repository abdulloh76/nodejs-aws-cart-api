import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { CartEntity } from './Cart.entity';
import { ProductEntity } from './Product.entity';

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

  @OneToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({name: 'product_id'})
  product: ProductEntity;
}