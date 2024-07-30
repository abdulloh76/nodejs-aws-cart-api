import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/Order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ OrderEntity])],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
