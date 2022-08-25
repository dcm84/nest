import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './interfaces/user-login.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    //пока без дополнительных проверок
    return await this.usersService.getUserByEmail(email);
  }

  async signin(loggingUser: UserLoginDTO) {
    const user = await this.usersService.getUserByEmail(loggingUser.email);

    if (!user) {
      throw new NotFoundException();
    }

    if (user && user.password === loggingUser.password) {
      const payload = {
        email: user.email,
        firstName: user.firstName,
      };

      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException();
  }
}
