import { Injectable } from '@nestjs/common';
import { ApiResponse } from './response.dto';

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
}