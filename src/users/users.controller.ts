import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { UserCreateDto } from './interfaces/user-create.dto';
import { User } from './schemas/user.schema';
import { ParseMongoIDPipe } from 'src/common/pipes/parse-mongoid.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async create(@Body() creatingBook: UserCreateDto) {
    this.usersService.create(creatingBook);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(
    @Param('id', new ParseMongoIDPipe()) id: string,
  ): Promise<User> {
    return this.usersService.getUser(id);
  }
}
