// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, age, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      age,
      password: hashedPassword,
      email,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }
}
