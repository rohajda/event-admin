/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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

    @Column({ type: 'datetime', name: 'event_start' })
    eventStart: any;

    @Column({ type: 'datetime', name: 'event_end' })
    eventEnd: any;

    @Column({ name: 'location', length: 200, nullable: true })
    location: string;

    @Column({ type: 'blob', name: 'event_image', nullable: true })
    eventImage: any;

    @Column({ name: 'event_image_content_type', nullable: true })
    eventImageContentType: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
