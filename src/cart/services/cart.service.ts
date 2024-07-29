import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/entities/Cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>
  ) {}

  async findByUserId(userId: string): Promise<CartEntity> {
    const cart = this.cartRepository.findOneBy({ user_id: userId });
    return cart;
  }

  async createByUserId(userId: string): Promise<CartEntity> {
    const id = v4();
    const userCart = {
      id,
      user_id: userId,
      status: 'OPEN',
    };
    return this.cartRepository.create(userCart);
  }

  async findOrCreateByUserId(userId: string): Promise<CartEntity> {
    const userCart = this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }
    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<CartEntity> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [ ...items ],
    }

    await this.cartRepository.update(updatedCart.id, updatedCart);

    return { ...updatedCart };
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartRepository.delete(userId);
  }

}
