import { Injectable } from '@nestjs/common';

@Injectable()
export class WasService {
  getHello(): string {
    return 'Hello World!';
  }
}
