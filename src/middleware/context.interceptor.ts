
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { GetAcceptLanguage } from 'src/common/context-function';

@Injectable()
export class AddContextAttribute implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request = context.switchToHttp().getRequest<Request>()

    // Set Accept Language
    let bahasa = GetAcceptLanguage(request)
    console.log(bahasa)

    // const now = Date.now();
    return next
      .handle()


    // Kode di bawah ini dipakai ketika post dari handler
    //   .pipe(
    //     tap(() => console.log(`After... ${Date.now() - now}ms`)),
    //   );
  }
}
