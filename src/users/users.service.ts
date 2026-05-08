import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  create(data: Partial<UserEntity>) {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }
}
