import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WasController } from './was.controller';
import { WasService } from './was.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    // MongooseModule.forRoot('mongodb:admin:admin@//localhost/nest'),
  ],
  controllers: [WasController],
  providers: [WasService],
})
export class WasModule {}
