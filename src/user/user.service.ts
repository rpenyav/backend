// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './get-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      name,
      surname,
      age,
      email,
      password,
      address,
      postalcode,
      phone1,
      phone2,
      especialidad,
      startDate,
      role,
      isActive,
    } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      surname,
      age,
      password: hashedPassword,
      email,
      address,
      postalcode,
      phone1,
      phone2,
      especialidad,
      startDate,
      role,
      isActive,
    });

    await this.userRepository.save(newUser);
    return newUser;
  }

  async getUserByEmail(email: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as UserDto;
    }
    return undefined;
  }
}
