import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1/hr-payroll');
  await app.listen(4003);
  console.log('S3 API is running on port 4003');
}
bootstrap();
