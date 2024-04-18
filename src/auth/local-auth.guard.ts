import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Asegúrate de implementar este Guard con Passport
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
