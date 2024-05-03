import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetEmail = createParamDecorator((data: string, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest();
  if (request && request.user.payload[data]) {
    console.log(request.user.payload);
    return request.user.payload[data];
  }
});
