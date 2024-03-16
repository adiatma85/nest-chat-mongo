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
  data?: T;
}

export class ErrorDTO {
  errorNumber: number
  errorMessage: string

  constructor(errorNumber: number, errorMessage: string) {
    this.errorNumber = errorNumber
    this.errorMessage = errorMessage
  }
}

export class TokenClass {
  sub: any
}

export enum ResponseMessage {
  SUCCESS = 'success',
  ERROR = 'error',
}

export enum ResponseStatus {
  OK = 'ok',
  ERROR = 'error',
}
