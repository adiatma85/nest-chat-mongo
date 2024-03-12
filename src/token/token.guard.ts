import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException, } from '@nestjs/common';
import { Request } from 'express';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user..schema';
import { JwtService } from '@nestjs/jwt';
import { ErrorDTO, TokenClass } from 'src/common/response.dto';
import { UserQueryDto } from 'src/user/dto/user.query.dto';
import { AllException, TransformError } from 'src/common/response.util';
import { ContextKey } from 'src/common/context-key';

@Injectable()
// https://blog.logrocket.com/how-to-implement-jwt-authentication-nestjs/
export class TokenGuard implements CanActivate {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new ErrorDTO(HttpStatus.BAD_REQUEST, "please provide token");

    let tokenExtracted = this.extractPayloadToken(token)

    // Build the user dto in here
    let userQueryDTO: UserQueryDto = {
      _id : tokenExtracted.sub
    }

    let user = await this.fetchUser(userQueryDTO)

    request[ContextKey.User] = user;

    return true;
  }

  // This function only check if the 
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  // Function to extract user from token. Ini sudah objek
  private extractPayloadToken(token: string) {
    return this.jwtService.decode<TokenClass>(token)
  }

  // Function to fetch user from model
  private async fetchUser(param: UserQueryDto) {
    try {
      const user = await this.userModel.findOne(param).exec();
      return user;
    } catch (error) {
      // Handle error
      throw new AllException(TransformError(error));
    }
  }
}
