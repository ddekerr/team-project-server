import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserDocument } from './schemas/user.schema';

import exceptionMessages from 'constants/exceptionMessages';
import { ChangeRolesDto } from './dto/change-role.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  // #################### CREATE NEW USER ####################
  async createUser(dto: CreateUserDto): Promise<UserDocument> {
    await this.checkUserNotExist(dto.email);
    const { password, ...rest } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (this.isSuperadminCredentials(dto.email, password)) {
      console.log('aDMIN');
      return await this.usersRepository.create({
        ...rest,
        password: hashedPassword,
        roles: ['superadmin'],
      });
    }
    console.log('NOT aDMIN');
    return await this.usersRepository.create({ ...rest, password: hashedPassword });
  }

  // #################### CHECK SUPERADMIN CREDENTIALS ####################
  private isSuperadminCredentials(email: string, password: string): boolean {
    if (email === process.env.SUPER_USER_EMAIL && password === process.env.SUPER_USER_PASSWORDs) {
      return true;
    }
    return false;
  }

  // #################### UPDATE USER BY EMAIL ####################
  async updateUser(email: string, dto: UpdateUserDto): Promise<UserDocument> {
    await this.checkUserExist(email);
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

  // #################### GET ONE USER BY EMAIL WITHOUT CHECKING ####################
  async getUserWithoutChecking(email: string): Promise<UserDocument> {
    return await this.usersRepository.getOne({ email });
  }

  // #################### GET USERS LIST ####################
  async getList(): Promise<UserDocument[]> {
    return await this.usersRepository.getList({});
  }

  // #################### CHANGE ROLE ####################
  async changeRoles(dto: ChangeRolesDto): Promise<UserDocument> {
    const { email, roles } = dto;
    return await this.usersRepository.update({ email }, { roles });
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
