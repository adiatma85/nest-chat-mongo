import { Injectable } from '@nestjs/common';

class NewError {
    ErrorCode: number;
    ErrorMessage: string;
}

@Injectable()
export class PtestingService {
    async getHello(): Promise<string | NewError> {
        return new Promise((resolve, reject) => {
            resolve('Hello World!');
        });
    }

    getHelloFail(): Promise<string | NewError> {
        return new Promise((resolve, reject) => {
            const newError = new NewError();
            reject(newError);
        });
    }
}
