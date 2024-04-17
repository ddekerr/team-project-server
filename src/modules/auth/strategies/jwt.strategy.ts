import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "modules/user/users.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from "../types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configServise: ConfigService, private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.REFRESH_TOKEN_SECRET,
        });
    }

    async validate(payload: Payload) {
        const user = await this.userService.getUser(payload.email)
        if (!user) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}
