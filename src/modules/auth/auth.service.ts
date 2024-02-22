import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from './interface/users.interface';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  constructor(@InjectModel('Users') private usersModel: Model<IUsers>) { }

  async createUser(createUserDto: CreateUserDto): Promise<IUsers> {
    const newUser = await new this.usersModel(createUserDto)
    return newUser.save()
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUsers> {
    const existingUser = await this.usersModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    if (!existingUser) {
      throw new NotFoundException(`Users ${userId} not found`)
    }
    return existingUser
  }

  async getAllUsers(): Promise<IUsers[]> {
    const usersData = await this.usersModel.find();
    if (!usersData || usersData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return usersData;
  }

  async getUser(userId: string): Promise<IUsers> {
    const existingStudent = await this.usersModel.findById(userId).exec();
    if (!existingStudent) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingStudent;
  }

  async deleteUser(userId: string){
    const deletedUser = await this.usersModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return { message: `User #${userId} delete` };
  }


}
