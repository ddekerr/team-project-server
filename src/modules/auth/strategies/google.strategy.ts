import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL:'http://localhost:5000/api/auth/google/callback',
            scope: ['email', 'profile']
        })
    }
    async validate(
        accessToken: string,
        regreshToken: string,
        profile,
        done: (err: any, user: any, info?: any) => void,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
}