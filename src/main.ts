import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Enabling cors
  app.enableCors();

  // Enabling global prefix
  app.setGlobalPrefix('api');

  // Enable global filter for http exception filter
  // app.useGlobalFilters(new HttpExceptionFilter())

  // Enabling context interceptor
  // app.useGlobalInterceptors(
  //   new AddContextAttribute(),
  //   new ResponseInterceptor()
  // );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
