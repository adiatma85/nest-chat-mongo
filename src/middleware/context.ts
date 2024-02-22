import { CanActivate, ExecutionContext, Injectable, NestMiddleware } from '@nestjs/common';
import { GetAcceptLanguage, SetAcceptLanguage } from 'src/common/context-function';

@Injectable()
export class AddContextAttribute implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {

    var req = SetAcceptLanguage(context, 'en');
    console.log(GetAcceptLanguage(req));

    return true
  }
}