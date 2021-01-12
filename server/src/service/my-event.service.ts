import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { MyEventDTO } from '../service/dto/my-event.dto';
import { MyEventMapper } from '../service/mapper/my-event.mapper';
import { MyEventRepository } from '../repository/my-event.repository';

const relationshipNames = [];

@Injectable()
export class MyEventService {
    logger = new Logger('MyEventService');

    constructor(@InjectRepository(MyEventRepository) private myEventRepository: MyEventRepository) {}

    async findById(id: string): Promise<MyEventDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.myEventRepository.findOne(id, options);
        return MyEventMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<MyEventDTO>): Promise<MyEventDTO | undefined> {
        const result = await this.myEventRepository.findOne(options);
        return MyEventMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<MyEventDTO>): Promise<[MyEventDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.myEventRepository.findAndCount(options);
        const myEventDTO: MyEventDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(myEvent => myEventDTO.push(MyEventMapper.fromEntityToDTO(myEvent)));
            resultList[0] = myEventDTO;
        }
        return resultList;
    }

    async save(myEventDTO: MyEventDTO): Promise<MyEventDTO | undefined> {
        const entity = MyEventMapper.fromDTOtoEntity(myEventDTO);
        const result = await this.myEventRepository.save(entity);
        return MyEventMapper.fromEntityToDTO(result);
    }

    async update(myEventDTO: MyEventDTO): Promise<MyEventDTO | undefined> {
        const entity = MyEventMapper.fromDTOtoEntity(myEventDTO);
        const result = await this.myEventRepository.save(entity);
        return MyEventMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.myEventRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
