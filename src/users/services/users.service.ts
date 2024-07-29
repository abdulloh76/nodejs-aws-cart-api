import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findOne(userId: string): Promise<UserEntity> {
    const user = this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async createOne({ name, password }: User): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ login: name });

    if (user) {
      throw new Error('User already exists');
    }
    const id = v4();
    const newUser = { id, login: name, password };

    return this.userRepository.create(newUser);
  }

}
