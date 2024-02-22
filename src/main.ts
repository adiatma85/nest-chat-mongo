import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AddContextAttribute } from './middleware/context';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Enabling cors
  app.enableCors();

  // Enabling global prefix
  app.setGlobalPrefix('api');

  // Enabling context guards
  app.useGlobalGuards(new AddContextAttribute());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('ptesting')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
