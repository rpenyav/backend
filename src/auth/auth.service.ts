// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // Asegura incluir también aquí el email si es necesario
    };
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const decoded = this.jwtService.verify(token);
      return !!decoded;
    } catch (error) {
      throw new UnauthorizedException(
        'Token verification failed: ' + error.message,
      );
    }
  }

  async decodeToken(
    token: string,
    ignoreExpiration: boolean = false,
  ): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        ignoreExpiration: ignoreExpiration,
      });
    } catch (error) {
      throw new UnauthorizedException(
        'Token verification failed: ' + error.message,
      );
    }
  }
  async refreshToken(decodedUser: any) {
    const payload = { email: decodedUser.email, sub: decodedUser.sub };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
