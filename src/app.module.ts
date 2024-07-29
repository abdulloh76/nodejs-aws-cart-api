import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entities/CartItem.entity';
import { CartEntity } from './entities/Cart.entity';
import { OrderEntity } from './entities/Order.entity';
import { UserEntity } from './entities/User.entity';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        CartItemEntity,
        CartEntity,
        OrderEntity,
        UserEntity,
      ],
      synchronize: true,
      ssl: false,
    })
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
