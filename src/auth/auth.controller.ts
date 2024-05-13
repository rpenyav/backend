// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpStatus,
  Req,
  HttpCode,
  Res,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  async verifyToken(@Req() request: Request, @Res() response: Response) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    const isValid = await this.authService.verifyToken(token);
    if (!isValid) {
      throw new UnauthorizedException('Token is invalid');
    }
    return { message: 'Token is valid' };
  }

  // En el método refreshToken del controlador
  @Post('refresh-token')
  async refreshToken(@Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const refreshToken = authHeader.split(' ')[1]; // Asegúrate de que esto es realmente un refresh token
    try {
      // Ignorar la expiración solo si estás seguro de que es un refresh token
      const decodedUser = await this.authService.decodeToken(
        refreshToken,
        true,
      );
      if (!decodedUser) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newTokens = await this.authService.refreshToken(decodedUser);
      return {
        access_token: newTokens.access_token,
        refresh_token: newTokens.refresh_token,
      };
    } catch (error) {
      throw new UnauthorizedException('Token refresh failed: ' + error.message);
    }
  }
}
