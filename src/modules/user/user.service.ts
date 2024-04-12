import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<IUser>) { }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {

        const { password, ...rest } = createUserDto

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await new this.userModel({ ...rest, password: hashedPassword })
        return newUser.save()
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {

        if (updateUserDto.hasOwnProperty('password')) {
            const { password, ...rest } = updateUserDto
            const hashedPassword = await bcrypt.hash(password, 10)
            updateUserDto = { ...rest, password: hashedPassword }
        }

        const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });

        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }

        return existingUser;
    }

    async getUser(userId: string): Promise<IUser> {

        const existingUser = await this.userModel.findById(userId).exec();
        
        if (!existingUser) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        
        return existingUser;
    }

    async deleteUser(userId:string):Promise<string>{
        const deleteUser = await this.userModel.findByIdAndDelete(userId)

        if(!deleteUser){
            throw new NotFoundException(`User #${userId} not found`)
        }
        return `User #${userId} delete`
    }
}
