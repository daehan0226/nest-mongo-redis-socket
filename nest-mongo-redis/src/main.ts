import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { ObserverModule } from './observer/observer.module';
import { WasModule } from './was/was.module';
import { EventsModule } from './websocket/events.module';

const service = process.env.SERVICE ?? 'was';
const port = process.env.PORT ?? 3001;

let AppModule;

if (service === 'ws') {
  AppModule = EventsModule;
} else if (service === 'observer') {
  AppModule = ObserverModule;
} else {
  AppModule = WasModule;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (service === 'ws') {
    app.useWebSocketAdapter(new WsAdapter(app));
  }
  console.log(`running ${service} on port ${port}`);
  await app.listen(port);
}
bootstrap();

// https://stackoverflow.com/questions/68713778/websockets-not-connecting-with-postman-using-nestjs
