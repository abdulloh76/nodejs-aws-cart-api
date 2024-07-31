import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { CartItemEntity } from './CartItem.entity';

@Entity('products')
export class ProductEntity  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({nullable: false})
  price: number;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  cartItem: CartItemEntity;

  @Column({nullable: false})
  created_at: Date;

  @Column({nullable: false})
  updated_at: Date;
}