import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/bi');
  await app.listen(4012);
  console.log('S12 API is running on port 4012');
}
bootstrap();
