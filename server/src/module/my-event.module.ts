import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyEventController } from '../web/rest/my-event.controller';
import { MyEventRepository } from '../repository/my-event.repository';
import { MyEventService } from '../service/my-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([MyEventRepository])],
  controllers: [MyEventController],
  providers: [MyEventService],
  exports: [MyEventService]
})
export class MyEventModule {}
