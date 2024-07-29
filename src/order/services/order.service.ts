import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/entities/Order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>
  ) {}

  async findById(orderId: string): Promise<OrderEntity> {
    const order = this.orderRepository.findOneBy({ id: orderId });
    return order;
  }

  async create(data: any) {
    const id = v4()
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    return this.orderRepository.create(order);
  }

  async update(orderId, data) {
    const order = this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    const updatedOrder = {
      ...order,
      ...data,
    }

    await this.orderRepository.update(orderId, updatedOrder);
  }
}
