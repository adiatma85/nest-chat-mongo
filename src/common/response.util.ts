import { HttpStatus, Inject, Injectable, HttpCode } from '@nestjs/common';
import { ApiResponse, ErrorDTO, ResponseMessage, ResponseStatus } from './response.dto';
import { Request } from 'express';
// import {  }

@Injectable()
export class ResponseService {
  generateApiResponse<T>(
    statusCode: number,
    message: string,
    path: string,
    requestId: string,
    timeElapsed: string,
    data: T,
  ): ApiResponse<T> {
    const status = statusCode >= 200 && statusCode < 400 ? 'OK' : 'Error';

    return {
      message: {
        title: status,
        body: message,
      },
      metadata: {
        path,
        statusCode,
        status,
        message: `${path} [${statusCode}] ${status}`,
        timestamp: new Date().toISOString(),
        requestId,
        timeElapsed,
      },
      data,
    };
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

export function TransformError(error: any) : ErrorDTO{
  return error as ErrorDTO
}
