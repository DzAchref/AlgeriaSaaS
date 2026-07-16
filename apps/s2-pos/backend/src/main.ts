import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/pos');
  await app.listen(4002);
  console.log('S2 API is running on port 4002');
}
bootstrap();
