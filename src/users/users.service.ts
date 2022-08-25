import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto } from './interfaces/user-create.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(newUser: UserCreateDto): Promise<User> {
    const createdUser = await this.userModel.create(newUser);
    return createdUser;
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(id: string): Promise<User> {
    return this.userModel.findById(id).select('-__v').exec();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).select('-__v').exec();
  }
}
