import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { Request } from 'express';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user..schema';

@Injectable()
// https://blog.logrocket.com/how-to-implement-jwt-authentication-nestjs/
export class TokenGuard implements CanActivate {

  constructor( 
    @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('please provide token');

    // const user = await this.userModel.


    // const user = await this.prisma.user.findFirst({
    //   where: { token },
    // });

    // if (user) {
    //   request['user'] = user;

    //   return true;
    // }

    // const tokenInstance = await this.prisma.token.findFirst({
    //   where: { token },
    //   include: { user: true },
    // });
    // if (!tokenInstance)
    //   throw new ForbiddenException('token not match any user');

    // const { user: userV2 } = tokenInstance;

    // request['user'] = userV2;
    // request['token'] = token;

    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
