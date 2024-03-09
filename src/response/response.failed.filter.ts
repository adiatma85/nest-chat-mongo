import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse, ErrorDTO, ResponseMessage, ResponseStatus } from 'src/common/response.dto';
import { AllException } from 'src/common/response.util';

@Catch(AllException)
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(
    ) { }

  async catch(exception: AllException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const respBody = this.ReturnHttpError(request, exception.errorDTO)

    response
      .status(status)
      .json(respBody);
  }

  // Function to Return HTTP Error Response
  ReturnHttpError(req: Request, errorObj: ErrorDTO) : ApiResponse<any>  {
    
    let status = ResponseStatus.ERROR;
    let path = req.path;
    let statusCode = errorObj.errorNumber;
    let title = errorObj.errorMessage 

    if (errorObj.errorNumber == 0) {
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR
      title = "Internal Server Error"
    }

    return {
      message: {
        title,
        body: ResponseMessage.ERROR,
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
    };
  }
}
