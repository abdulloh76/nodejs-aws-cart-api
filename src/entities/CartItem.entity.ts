import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { CartEntity } from './Cart.entity';
import { OrderEntity } from './Order.entity';

@Entity()
export class CartItemEntity {
  @Column({nullable: false})
  cart_id: string;

  @Column()
  product_id: string;

  @Column()
  count: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({name: 'product_id'})
  product: ProductEntity[];

  @ManyToOne(() => CartEntity, (cart) => cart.id)
  @JoinColumn({name: 'cart_id'})
  cart: CartEntity[];

  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({name: 'order_id'})
  order: OrderEntity[];
}