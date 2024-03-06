
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { SetRequestId, SetServiceVersion } from 'src/common/context-function';

@Injectable()
export class AddContextAttribute implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest<Request>()

    // Generate uuid
    SetRequestId(request)
    SetServiceVersion(request, "0.0.1")

    return next
      .handle()
  }
}
