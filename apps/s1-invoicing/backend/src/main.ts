import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/v1/invoicing');

  const port = process.env.S1_INVOICING_PORT || 4001;
  await app.listen(port);
  console.log(`S1 Invoicing API is running on: http://localhost:${port}`);
}
bootstrap();
