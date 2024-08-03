import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/Product.entity';
import { CartItemEntity } from '../entities/CartItem.entity';
import { CartEntity } from '../entities/Cart.entity';


@Module({
  imports: [ TypeOrmModule.forFeature([ ProductEntity, CartItemEntity, CartEntity ]) , OrderModule],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
