import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SetCookie = createParamDecorator((token: string, ctx: ExecutionContext) => {
  const response = ctx.switchToHttp().getResponse();
  response.cookie('refreshToken', token);
  console.log(response.cookies);
});
