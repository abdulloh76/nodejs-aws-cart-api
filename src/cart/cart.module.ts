import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/Product.entity';
import { CartItemEntity } from 'src/entities/CartItem.entity';
import { CartEntity } from 'src/entities/Cart.entity';


@Module({
  imports: [ OrderModule, TypeOrmModule.forFeature([ ProductEntity, CartItemEntity, CartEntity ]) ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
