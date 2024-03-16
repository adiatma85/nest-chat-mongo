import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Environment variables
let jwtSecret : string
let mongoDBUri : string

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
  
  // Constructor to assign environment variables
  constructor() {
    jwtSecret = process.env.JWT_SECRET
    mongoDBUri = process.env.MONGODB_URI
  }

}
