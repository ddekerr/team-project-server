import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './schemas/user.schema';

import exceptionMessages from 'constants/exceptionMessages';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  // #################### CREATE NEW USER ####################
  async createUser(dto: CreateUserDto): Promise<UserDocument> {
    await this.checkUserNotExist(dto.email);
    const { password, ...rest } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersRepository.create({ ...rest, password: hashedPassword });
  }

  // #################### UPDATE USER BY EMAIL ####################
  async updateUser(email: string, dto: UpdateUserDto): Promise<UserDocument> {
    await this.checkUserExist(dto.email);
    return await this.usersRepository.update({ email }, dto);
  }

  // #################### DELETE USER BY EMAIL ####################
  async deleteUser(email: string): Promise<UserDocument> {
    await this.checkUserExist(email);
    return await this.usersRepository.delete({ email });
  }

  // #################### GET ONE USER BY EMAIL ####################
  async getUser(email: string): Promise<UserDocument> {
    return await this.checkUserExist(email);
  }

  // #################### GET USERS LIST ####################
  async getList(): Promise<UserDocument[]> {
    return await this.usersRepository.getList({});
  }

  // #################### CHECK USER IS NOT EXIST ####################
  private async checkUserNotExist(email: string): Promise<void> {
    const candidate = await this.usersRepository.getOne({ email });
    if (candidate) {
      throw new ConflictException(exceptionMessages.CONFLICT_EMAIL_MSG);
    }
  }

  // #################### CHECK USER IS EXIST ####################
  private async checkUserExist(email: string): Promise<UserDocument> {
    const candidate = await this.usersRepository.getOne({ email });
    if (!candidate) {
      throw new NotFoundException(exceptionMessages.NOT_FOUND_USER_MSG);
    }

    return candidate;
  }
}
