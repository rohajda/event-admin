import { EntityRepository, Repository } from 'typeorm';
import { MyEvent } from '../domain/my-event.entity';

@EntityRepository(MyEvent)
export class MyEventRepository extends Repository<MyEvent> {}
