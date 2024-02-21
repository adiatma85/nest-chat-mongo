import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AddContextAttribute implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');

    // Log sudah jalan di sini
    next();
  }
}