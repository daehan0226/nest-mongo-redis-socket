import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { WasModule } from './app.module';
import { EventsModule } from './events/events.module';

const service = process.env.SERVICE ?? 'local';
const port = process.env.PORT ?? 8080;

let AppModule;

if (service === 'was') {
  AppModule = WasModule;
} else {
  AppModule = EventsModule;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  console.log(`running ${service} on port ${port}`);
  await app.listen(port);
}
bootstrap();

// https://stackoverflow.com/questions/68713778/websockets-not-connecting-with-postman-using-nestjs
