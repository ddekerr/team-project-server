import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../types';
import { Request } from 'express';

@Injectable()
export class RTStrategy extends PassportStrategy(Strategy, 'refresh-strategy') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([RTStrategy.fromCookies]),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
    });
  }

  private static fromCookies(request: Request): string {
    const token: string = request.cookies['refreshToken'];
    console.log(request.cookies);
    console.log(token);
    return token;
  }

  async validate(payload: Payload) {
    console.log(payload);
    return payload;
  }
}
