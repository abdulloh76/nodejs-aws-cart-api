import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { Order } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../entities/Order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async findById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    const orderObj: Order = {
      id: order.id,
      userId: order.user_id,
      cartId: order.cart_id,
      items: order.cart.items,
      payment: order.payment,
      delivery: order.delivery,
      comments: order.comments,
      status: order.status,
      total: order.total,
    }
    return orderObj;
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

    // TODO: there has to be complicated logic for update

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
