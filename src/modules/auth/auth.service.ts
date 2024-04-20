import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'modules/user/dto/create-user.dto';
// import { UserDocument } from 'modules/user/schemas/user.schema';
import { UsersService } from 'modules/user/users.service';
import { Payload, Token, TokenType, Tokens, UserResponseWithRefresh } from './types';

import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from 'constants/tokens';
import { UserDocument } from 'modules/user/schemas/user.schema';
import { compareSync } from 'bcrypt';
import exceptionMessages from 'constants/exceptionMessages';
import successMessages from 'constants/successMessages';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // #################### REGISTER NEW USER ####################
  async register(dto: CreateUserDto): Promise<UserResponseWithRefresh> {
    const user = await this.usersService.createUser(dto);
    return await this.generateResponse(user);
  }

  // #################### LOGIN USER ####################
  async login(dto: CreateUserDto): Promise<UserResponseWithRefresh> {
    const user = await this.usersService.getUser(dto.email);
    this.checkPassword(dto.password, user.password);
    return await this.generateResponse(user);
  }

  // #################### LOGOUT USER ####################
  async logout(email: string): Promise<string> {
    await this.usersService.getUser(email);
    return successMessages.USER_LOGGED_IN_MSG;
  }

  // #################### REFRESH USER ####################
  async refresh(email: string): Promise<Tokens> {
    const user = await this.usersService.getUser(email);
    return await this.generateTokens({ email: user.email, userId: user._id });
  }

  // #################### GENERATE ACCESS AND REFRESH TOKENS ####################
  // це асинхронна функція вона через Promise.all генерить масив токенів і повертає об'єктом
  async generateTokens(payload: Payload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.getToken(payload, TokenType.ACCESS),
      this.getToken(payload, TokenType.REFRESH),
    ]);

    return { accessToken, refreshToken };
  }

  // #################### GENERATE TOKEN ####################
  // це синхронна функція, вона буде використовувати jwt сервіс і викликатися у функції generateTokens
  private getToken(payload: Payload, type: TokenType): Token {
    const expiresIn = type === TokenType.ACCESS ? ACCESS_TOKEN_EXPIRES_IN : REFRESH_TOKEN_EXPIRES_IN;
    const secret = type === TokenType.ACCESS ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;

    const tokens = this.jwtService.sign({ payload }, { secret, expiresIn });

    return tokens;
  }

  // #################### COMPARE PASSWORD HASH ####################
  private checkPassword(rawPassword: string, hashPassword: string): void {
    const isPasswordValid = compareSync(rawPassword, hashPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException(exceptionMessages.UNAUTHORIZED_PASSWORD_MSG);
    }
  }

  // #################### GENERATE THE SAME RESPONSE FOR REGISTER AND LOGIN ####################
  private async generateResponse(user: UserDocument): Promise<UserResponseWithRefresh> {
    const { accessToken, refreshToken } = await this.generateTokens({ email: user.email, userId: user._id });
    const userResponse = { user, token: accessToken };
    return { userResponse, refreshToken };
  }
}
