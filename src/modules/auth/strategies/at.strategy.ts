import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../types';
import { AuthService } from '../auth.service';

@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'access-strategy') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: Payload) {
    // the time left for expired access token
    const timeLeft = payload['exp'] - Date.now() / 1000;

    // if that time less then 30 seconds notice that a refresh is needed
    if (timeLeft < 30) {
      payload['payload']['refresh'] = true;
    }
    
    return payload;
  }
}
