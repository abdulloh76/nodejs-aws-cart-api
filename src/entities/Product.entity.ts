import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}