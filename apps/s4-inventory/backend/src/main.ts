import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/inventory');
  await app.listen(4004);
  console.log('S4 API is running on port 4004');
}
bootstrap();
