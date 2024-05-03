import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'helpers/ApiResponse';

@Injectable()
export class ClearCookieInterceptor implements NestInterceptor {
  private REFRESH_TOKEN_KEY = 'refreshToken';

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    // get response from controller
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((res: ApiResponse<any>) => {
        response.clearCookie(this.REFRESH_TOKEN_KEY);
        return res;
      }),
    );
  }
}
