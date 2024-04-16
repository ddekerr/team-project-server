import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'modules/user/dto/create-user.dto';
// import { UserDocument } from 'modules/user/schemas/user.schema';
import { UsersService } from 'modules/user/users.service';
import { Payload, Token, TokenType, Tokens, UserResponse } from './types';

import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from 'constants/tokens';
import { UserDocument } from 'modules/user/schemas/user.schema';
import { compareSync } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Tokens_ } from './schema/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(Tokens_.name) private tokenModel: Model<Tokens_>
  ) { }

  // #################### REGISTER NEW USER ####################
  async register(dto: CreateUserDto): Promise<UserDocument> {
    return await this.usersService.createUser(dto);
  };


  // #################### LOGIN USER ####################
  async login(dto: CreateUserDto) {
    const user: UserDocument = await this.usersService.getUser(dto.email)

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Wrong login or password')
    }

    const tokens = this.generateTokens({ userId: user._id }, user);

    return { accessToken: (await tokens).accessToken, refreshToken: (await tokens).refreshToken };
  }

  // #################### GENERATE ACCESS AND REFRESH TOKENS ####################
  // це асинхронна функція вона через Promise.all генерить масив токенів і повертає об'єктом
  async generateTokens(payload: Payload, user: UserDocument): Promise<Tokens> {
    // const [accessToken, refreshToken] = await Promise.all([
    //   this.getToken(payload, TokenType.ACCESS),
    //   this.getToken(payload, TokenType.REFRESH),
    // ]);

    const accessToken = await this.getToken(payload, TokenType.ACCESS)

    const refreshToken = await this.getRefreshToken(payload, user)

    return { accessToken, refreshToken };
  }

  // #################### GENERATE TOKEN ####################
  // це синхронна функція, вона буде використовувати jwt сервіс і викликатися у функції generateTokens
  private getToken(payload: Payload, type: TokenType): Token {
    const expiresIn = type === TokenType.ACCESS ? ACCESS_TOKEN_EXPIRES_IN : REFRESH_TOKEN_EXPIRES_IN;
    const secret = type === TokenType.ACCESS ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;

    const tokens = this.jwtService.sign({ payload }, { secret, expiresIn });

    return tokens
  }

  private async getRefreshToken(payload: Payload, user: UserDocument) {
    const token = await this.tokenModel.findById(user._id)

    const refreshToken = this.getToken(payload, TokenType.REFRESH)

    if (token) {
      await this.tokenModel.updateOne(
        { _id: user._id },
        {
          $set: {
            token: refreshToken,
            exp: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN), // додаємо 30 днів до поточної дати
          },
        }
      );
    } else {
      // Якщо запис не знайдено, вставляємо новий
      await this.tokenModel.create({
        token: refreshToken,
        exp: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN), // додаємо 30 днів до поточної дати
        userId: user._id,
      })
    }
    return refreshToken
  }
}