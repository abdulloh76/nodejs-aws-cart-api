import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Cart, CartItem, CartStatuses } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../../entities/Cart.entity';
import { CartItemEntity } from '../../entities/CartItem.entity';
import { ProductEntity } from '../../entities/Product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItemRepository: Repository<CartItemEntity>,
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>
  ) { }

  async findByUserId(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user_id: userId, status: CartStatuses.OPEN },
      relations: { items: { product: true } },
    });

    if (!cart) {
      return null;
    }

    const cartObj: Cart = {
      id: cart.id,
      user_id: cart.user_id,
      items: cart.items,
      status: cart.status as CartStatuses,
    }

    return cartObj;
  }

  async createByUserId(userId: string): Promise<Cart> {
    const cart  = new CartEntity();
    cart.id = v4();
    cart.user_id = userId;
    cart.status = CartStatuses.OPEN;

    await this.cartRepository.save(cart);

    return this.findByUserId(userId);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }
    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, item: CartItem): Promise<Cart> {
    const { id } = await this.findOrCreateByUserId(userId);

    const existingItem = await this.cartItemRepository.findOne({ where: { product_id: item.product.id } });
    await this.productRepository.upsert(item.product, ['id']);
    if (existingItem) {
      await this.cartItemRepository.update({ id: existingItem.id }, { count: item.count });
    } else {
      const cartItem  = new CartItemEntity();
      cartItem.cart_id = id;
      cartItem.product_id = item.product.id;
      cartItem.count = item.count
      await this.cartItemRepository.save(cartItem);
    }

    return this.findByUserId(userId);
  }

  async updateStatusByUserId(userId, status: CartStatuses): Promise<void> {
    await this.cartRepository.update(
      { user_id: userId },
      { status }
    );
  }

  async removeByUserId(userId): Promise<void> {
    await this.cartRepository.delete(userId);
  }

}
