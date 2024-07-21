import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cors
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
    // all headers that client are allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });

  // Enable Cookie Parser
  app.use(cookieParser());

  // Enable GraphqlUploadExpress
  app.use(graphqlUploadExpress({ maxFileSize: 10000000000, maxFiles: 1 }));

  // Enable Global Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(
            ', ',
          );
          return accumulator;
        }, {});

        throw new BadRequestException(formattedErrors);
      },
    }),
  );

  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
