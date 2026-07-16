import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/btp');
  await app.listen(4011);
  console.log('S11 API is running on port 4011');
}
bootstrap();
