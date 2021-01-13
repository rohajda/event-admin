import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyEventController } from '../web/rest/my-event.controller';
import { MyEventRepository } from '../repository/my-event.repository';
import { MyEventService } from '../service/my-event.service';
import { EventController } from '../web/rest/event.controller';

@Module({
    imports: [TypeOrmModule.forFeature([MyEventRepository])],
    controllers: [MyEventController, EventController],
    providers: [MyEventService],
    exports: [MyEventService],
})
export class MyEventModule {
}
