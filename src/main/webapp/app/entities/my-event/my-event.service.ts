import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMyEvent } from 'app/shared/model/my-event.model';

type EntityResponseType = HttpResponse<IMyEvent>;
type EntityArrayResponseType = HttpResponse<IMyEvent[]>;

@Injectable({ providedIn: 'root' })
export class MyEventService {
  public resourceUrl = SERVER_API_URL + 'api/my-events';

  constructor(protected http: HttpClient) {}

  create(myEvent: IMyEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(myEvent);
    return this.http
      .post<IMyEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(myEvent: IMyEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(myEvent);
    return this.http
      .put<IMyEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMyEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMyEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(myEvent: IMyEvent): IMyEvent {
    const copy: IMyEvent = Object.assign({}, myEvent, {
      eventStart: myEvent.eventStart && myEvent.eventStart.isValid() ? myEvent.eventStart.toJSON() : undefined,
      eventEnd: myEvent.eventEnd && myEvent.eventEnd.isValid() ? myEvent.eventEnd.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.eventStart = res.body.eventStart ? moment(res.body.eventStart) : undefined;
      res.body.eventEnd = res.body.eventEnd ? moment(res.body.eventEnd) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((myEvent: IMyEvent) => {
        myEvent.eventStart = myEvent.eventStart ? moment(myEvent.eventStart) : undefined;
        myEvent.eventEnd = myEvent.eventEnd ? moment(myEvent.eventEnd) : undefined;
      });
    }
    return res;
  }
}
