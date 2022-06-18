import { Controller, Get } from '@nestjs/common';
import { WasService } from './was.service';

@Controller()
export class WasController {
  constructor(private readonly appService: WasService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
