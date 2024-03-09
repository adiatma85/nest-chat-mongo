import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpException } from '@nestjs/common';
import { AllException } from 'src/common/response.util';
import { ApiResponse, ResponseMessage } from 'src/common/response.dto';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
      .pipe(
      map((res: unknown) => this.responseHandler(res, context))
    )
    ;
  }

  // Function to handle Success
  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return this.ReturnHttpSuccess(request, res)
  }

  // Function to Return HTTP Success Response
  ReturnHttpSuccess(req: Request, data: any): ApiResponse<any> {
    let status = "OK";
    let path = req.path;
    let statusCode = HttpStatus.OK;

    return {
      message: {
        title: status,
        body: ResponseMessage.SUCCESS,
      },
      metadata: {
        path,
        statusCode,
        status,
        message: `${path} [${statusCode}] ${status}`,
        timestamp: new Date().toISOString(),
        requestId: "requestId",
        timeElapsed: '0.0',
      },
      data,
    };
  }
}
