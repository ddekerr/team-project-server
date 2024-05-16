import { REFRESH_TOKEN_KEY } from 'constants/tokens';
import { Observable } from 'rxjs';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import exceptionMessages from 'constants/exceptionMessages';

@Injectable()
export class CheckRefresh implements NestInterceptor {
  private REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
  constructor(private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request && request.user.payload.needRefresh) {
      const refreshToken: string = request.cookies[REFRESH_TOKEN_KEY];

      // if token empty throw error
      if (!refreshToken) {
        throw new UnauthorizedException(exceptionMessages.UNAUTHORIZED_TOKEN_MISSING_MSG);
      }

      // if token invalid throw error
      const payload = this.jwtService.verify(refreshToken, { secret: this.REFRESH_SECRET });
      if (!payload) {
        throw new UnauthorizedException(exceptionMessages.UNAUTHORIZED_TOKEN_VALID_MSG);
      }

      // if token expired throw error
      const timeLeft = payload['exp'] - Date.now() / 1000;
      if (timeLeft <= 0) {
        throw new UnauthorizedException(exceptionMessages.UNAUTHORIZED_TOKEN_EXPIRED_MSG);
      }

      request.user.payload.email = payload.email;
    }

    return next.handle();
  }
}
