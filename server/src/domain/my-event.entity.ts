/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A MyEvent.
 */
@Entity('my_event')
export class MyEvent extends BaseEntity {
    @Column({ name: 'title', length: 120 })
    title: string;

    @Column({ name: 'description', length: 2000 })
    description: string;

    @Column({ type: 'boolean', name: 'full_day', nullable: true })
    fullDay: boolean;

    @Column({ name: 'event_start' })
    eventStart: Date;

    @Column({ name: 'event_end' })
    eventEnd: Date;

    @Column({ name: 'location', length: 200, nullable: true })
    location: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
