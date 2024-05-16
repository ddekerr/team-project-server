import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Payload = createParamDecorator((data: string, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest();

  if (request && request.user.payload[data]) {
    return request.user.payload[data];
  }
});
