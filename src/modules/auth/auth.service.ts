import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'modules/user/dto/create-user.dto';
// import { UserDocument } from 'modules/user/schemas/user.schema';
import { UsersService } from 'modules/user/users.service';
import { Payload, Token, TokenType, Tokens, UserResponse } from './types';

import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from 'constants/tokens';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // #################### REGISTER NEW USER ####################
  async register(dto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.createUser(dto);

    // generate tokens
    const tokens = this.generateTokens({ email: dto.email });

    return { user, token: (await tokens).accessToken };
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

    return this.jwtService.sign({ payload }, { secret, expiresIn });
  }
}
