import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  // ########## INSERT NEW USER INTO USERS TABLE ##########
  async create(createEntityData: unknown): Promise<UserDocument> {
    const newUser = await this.usersModel.create(createEntityData);
    return newUser;
  }

  // ########## UPDATE USER FROM USERS TABLE ##########
  async update(
    entityFilterQuery: FilterQuery<UserDocument>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<UserDocument> {
    return await this.usersModel.findOneAndUpdate(entityFilterQuery, updateEntityData, {
      new: true,
    });
  }

  // ########## DELETE USER FROM USERS TABLE ##########
  async delete(entityFilterQuery: FilterQuery<UserDocument>): Promise<UserDocument> {
    return await this.usersModel.findOneAndDelete(entityFilterQuery, {});
  }

  // ########## SELECT ONE USER FROM USERS TABLE ##########
  async getOne(entityFilterQuery: FilterQuery<UserDocument>): Promise<UserDocument> {
    return await this.usersModel.findOne(entityFilterQuery);
  }

  // ########## SELECT USERS LIST FROM USERS TABLE ##########
  async getList(entityFilterQuery: FilterQuery<UserDocument>): Promise<UserDocument[]> {
    return await this.usersModel.find(entityFilterQuery);
  }
}
