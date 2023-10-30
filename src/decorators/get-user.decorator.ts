/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request: Express.Request | any = ctx.switchToHttp().getRequest();
        if (data) {
            return request.user[data]
        }
        return request.user;
    },
);
