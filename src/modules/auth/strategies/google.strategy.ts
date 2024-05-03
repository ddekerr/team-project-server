import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
      callbackURL: 'http://localhost:5001/api/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(googleAccessToken: string, googleRefreshToken: string, profile: Profile, done: VerifyCallback) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      googleAccessToken,
    };

    done(null, user);
  }
}
