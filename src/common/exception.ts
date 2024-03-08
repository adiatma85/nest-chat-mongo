// This will be used on further improvement


import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { AllException, ResponseService } from './response.util';

@Catch(AllException)
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(
      private readonly responseService: ResponseService
    ) { }

  async catch(exception: AllException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const respBody = this.responseService.ReturnHttpError(request, exception.errorDTO)

    response
      .status(status)
      .json(respBody);
  }
}
