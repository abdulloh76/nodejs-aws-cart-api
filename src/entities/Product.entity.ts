import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class ProductEntity  {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({nullable: false})
  price: number;

  @Column({nullable: false})
  created_at: Date;

  @Column({nullable: false})
  updated_at: Date;
}