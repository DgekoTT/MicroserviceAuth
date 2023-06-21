import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';




async function listen() {
  const PORT = process.env.PORT || 5010;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log(`Server Auth is started on PORT = ${PORT} `))
}


listen()

