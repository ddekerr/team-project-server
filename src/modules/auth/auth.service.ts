import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'modules/user/dto/create-user.dto';
import { UsersService } from 'modules/user/users.service';
import { Tokens, UserResponseWithRefresh } from './types';

import { UserDocument } from 'modules/user/schemas/user.schema';
import { compareSync } from 'bcrypt';
import exceptionMessages from 'constants/exceptionMessages';
import successMessages from 'constants/successMessages';
import { TokensService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
  ) {}

  // #################### REGISTER NEW USER ####################
  async register(dto: CreateUserDto): Promise<UserResponseWithRefresh> {
    const user = await this.usersService.createUser(dto);
    return await this.generateResponse(user);
  }

  // #################### LOGIN USER ####################
  async login(dto: CreateUserDto): Promise<UserResponseWithRefresh> {
    const user = await this.usersService.getUser(dto.email);

    if (user.password !== undefined) {
      this.checkPassword(dto.password, user.password);
      return await this.generateResponse(user);
    }
    throw new UnauthorizedException(exceptionMessages.UNAUTHORIZED_PASSWORD_MSG);
  }

  // #################### LOGOUT USER ####################
  async logout(email: string): Promise<string> {
    await this.usersService.getUser(email);
    return successMessages.USER_LOGOUT_MSG;
  }

  // #################### GET USER BY EMAIL ####################
  async me(email: string): Promise<UserResponseWithRefresh> {
    const user = await this.usersService.getUser(email);
    return await this.generateResponse(user);
  }

  // #################### REFRESH USER ####################
  async refresh(email: string): Promise<Tokens> {
    const user = await this.usersService.getUser(email);
    return await this.tokensService.generateTokens({ email: user.email, userId: user._id });
  }

  // #################### COMPARE PASSWORD HASH ####################
  private checkPassword(rawPassword: string, hashPassword: string): void {
    const isPasswordValid = compareSync(rawPassword, hashPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException(exceptionMessages.UNAUTHORIZED_PASSWORD_MSG);
    }
  }

  // #################### GENERATE THE SAME RESPONSE FOR REGISTER AND LOGIN ####################
  async generateResponse(user: UserDocument): Promise<UserResponseWithRefresh> {
    const { accessToken, refreshToken } = await this.tokensService.generateTokens({
      email: user.email,
      userId: user._id,
    });
    const userResponse = { user, token: accessToken };
    return { userResponse, refreshToken };
  }
}
