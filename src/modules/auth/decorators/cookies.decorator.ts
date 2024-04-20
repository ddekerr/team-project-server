import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Payload } from '../types';

export const GetPayload = createParamDecorator((key: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user: unknown = request.user;

  // console.log(payload);

  return user?.['payload']['email'];
});
