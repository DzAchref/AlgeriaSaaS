import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/ecommerce');
  await app.listen(4009);
  console.log('S9 API is running on port 4009');
}
bootstrap();
