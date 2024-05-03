import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload, Token, TokenType, Tokens } from './types';
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from 'constants/tokens';

@Injectable()
export class TokensService {
  constructor(private jwtService: JwtService) {}

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
