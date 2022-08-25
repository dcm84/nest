import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserLoginDTO } from './interfaces/user-login.dto';

@Controller('api/users/signin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signin(@Body() user: UserLoginDTO) {
    return this.authService.signin(user);
  }
}
