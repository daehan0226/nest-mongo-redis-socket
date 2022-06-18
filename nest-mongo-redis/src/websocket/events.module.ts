import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  providers: [EventsGateway],
})
export class EventsModule {}
