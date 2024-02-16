import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enabling cors
  app.enableCors();

  const port = configService.get<number>('PORT')
  await app.listen(port);
}
bootstrap();
