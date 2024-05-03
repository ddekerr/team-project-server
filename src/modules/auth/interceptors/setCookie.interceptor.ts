import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

import { ApiResponse } from 'helpers/ApiResponse';
import { REFRESH_TOKEN_EXPIRES_IN } from 'constants/tokens';

@Injectable()
export class SetCookieInterceptor implements NestInterceptor {
  private REFRESH_TOKEN_KEY = 'refreshToken';

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    // get response from controller
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((res: ApiResponse<any>) => {
        // if token exist set cookies to response
        const refreshToken = res.getdata().refreshToken;
        if (res && refreshToken) {
          response.cookie(this.REFRESH_TOKEN_KEY, refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN * 1000),
          });
        }

        // return ApiResponse without refresh token
        const status = res.getStatus();
        const message = res.getMessage();
        const userResponse = res.getdata().userResponse;
        return { status, data: userResponse, message };
      }),
    );
  }
}
