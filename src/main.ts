import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const LibraryPort = process.env.LIBRARY_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(LibraryPort);
}
bootstrap();
