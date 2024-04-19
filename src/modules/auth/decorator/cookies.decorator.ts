import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator((key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    console.log(request.cookies[key]);
    
    return request.cookies[key]
});
