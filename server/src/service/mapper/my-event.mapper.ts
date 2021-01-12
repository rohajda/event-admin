import { MyEvent } from '../../domain/my-event.entity';
import { MyEventDTO } from '../dto/my-event.dto';

/**
 * A MyEvent mapper object.
 */
export class MyEventMapper {
    static fromDTOtoEntity(entityDTO: MyEventDTO): MyEvent {
        if (!entityDTO) {
            return;
        }
        const entity = new MyEvent();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: MyEvent): MyEventDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new MyEventDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
