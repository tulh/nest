import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    users.forEach(user => user.roles);
    return users;
  }

  async findOne(id): Promise<User> {
    const user = await this.userRepository.findOne(id);
    await user.roles;
    return user;
  }

  async customQuery(): Promise<User[]> {
    // return await this.userRepository.find({ join: { alias: 'user', leftJoinAndSelect: { roles: 'user.roles' } } });
    return await this.userRepository.createQueryBuilder('user').leftJoinAndSelect('user.roles', 'role').getMany();
  }
}