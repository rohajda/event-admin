import { Moment } from 'moment';

export interface IMyEvent {
  id?: number;
  title?: string;
  description?: string;
  fullDay?: boolean;
  eventStart?: Moment;
  eventEnd?: Moment;
  location?: string;
  eventImageContentType?: string;
  eventImage?: any;
}

export class MyEvent implements IMyEvent {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public fullDay?: boolean,
    public eventStart?: Moment,
    public eventEnd?: Moment,
    public location?: string,
    public eventImageContentType?: string,
    public eventImage?: any
  ) {
    this.fullDay = this.fullDay || false;
  }
}
