import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  WsResponse,
  SubscribeMessage,
} from '@nestjs/websockets';
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ path: '/ws' })
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  users: number = 0;

  wsClients = {};
  afterInit() {
    console.log('init web sockect server');
  }

  async handleConnection(socket: Socket) {}

  async handleDisconnect(socket: Socket) {}

  @SubscribeMessage('events') // 프론트에서 EVENT를 지정해준 것에 맞춰서 보내짐
  handleEvent(client: any, data: any) {
    return { event: 'events', data };
  }

  @SubscribeMessage('users')
  handleUser(client: any, data: any) {
    if (this.wsClients[data.userId]) {
      this.wsClients[data.userId] += 1;
    } else {
      this.wsClients[data.userId] = 1;
    }
    console.log(this.wsClients);
    return {
      event: 'users',
      data: { userId: data.userId, count: this.wsClients[data.userId] },
    };
  }
}
