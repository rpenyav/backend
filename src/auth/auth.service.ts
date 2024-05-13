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

  // En src/auth/auth.service.ts
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }), // Cambiado de 1m a 15m
    };
  }

  async decodeToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Manejar específicamente la expiración del token, si es necesario
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException(
        'Token verification failed: ' + error.message,
      );
    }
  }

  async decodeRefreshToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, { ignoreExpiration: true }); // Ignora la expiración para refresh token
    } catch (error) {
      throw new UnauthorizedException(
        'Token verification failed: ' + error.message,
      );
    }
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

  // src/auth/auth.service.ts
  async refreshToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }), // 15 minutos
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // 7 días
    };
  }
}
