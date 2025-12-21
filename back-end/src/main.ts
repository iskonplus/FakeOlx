import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  await app.listen(PORT);
  console.log(`Server listening on http://localhost:${PORT}`);
}

void bootstrap();
