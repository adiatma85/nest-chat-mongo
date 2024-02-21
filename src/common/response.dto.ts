export class ApiResponse<T> {
    message: { title: string; body: string };
    metadata: {
      path: string;
      statusCode: number;
      status: string;
      message: string;
      timestamp: string;
      requestId: string;
      timeElapsed: string;
    };
    data: T;
  }
  