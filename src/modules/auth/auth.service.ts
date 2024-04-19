import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'modules/user/dto/create-user.dto';
// import { UserDocument } from 'modules/user/schemas/user.schema';
import { UsersService } from 'modules/user/users.service';
import { Payload, Token, TokenType, Tokens, UserResponse, UserResponseWithRefresh } from './types';

import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from 'constants/tokens';
import { UserDocument } from 'modules/user/schemas/user.schema';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // #################### REGISTER NEW USER ####################
  async register(dto: CreateUserDto): Promise<UserResponseWithRefresh> {
    const user = await this.usersService.createUser(dto);

    const { accessToken, refreshToken } = await this.generateTokens(user._id);

    const userResponse = { user, token: accessToken };
    return { userResponse, refreshToken };
  }

  // #################### LOGIN USER ####################
  async login(dto: CreateUserDto) {
    const user = await this.usersService.getUser(dto.email);

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Wrong login or password');
    }

    const { accessToken, refreshToken } = await this.generateTokens({ email: user.email, userId: user._id });

    console.log(accessToken);

    return { accessToken, refreshToken };
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
}
