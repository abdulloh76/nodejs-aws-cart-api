import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { CartItemEntity } from './CartItem.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
}