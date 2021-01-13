import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { MyEventService } from 'app/entities/my-event/my-event.service';
import { IMyEvent, MyEvent } from 'app/shared/model/my-event.model';

describe('Service Tests', () => {
  describe('MyEvent Service', () => {
    let injector: TestBed;
    let service: MyEventService;
    let httpMock: HttpTestingController;
    let elemDefault: IMyEvent;
    let expectedResult: IMyEvent | IMyEvent[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(MyEventService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new MyEvent(0, 'AAAAAAA', 'AAAAAAA', false, currentDate, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            eventStart: currentDate.format(DATE_TIME_FORMAT),
            eventEnd: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MyEvent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            eventStart: currentDate.format(DATE_TIME_FORMAT),
            eventEnd: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventStart: currentDate,
            eventEnd: currentDate
          },
          returnedFromService
        );

        service.create(new MyEvent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MyEvent', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            description: 'BBBBBB',
            fullDay: true,
            eventStart: currentDate.format(DATE_TIME_FORMAT),
            eventEnd: currentDate.format(DATE_TIME_FORMAT),
            location: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventStart: currentDate,
            eventEnd: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MyEvent', () => {
        const returnedFromService = Object.assign(
          {
            title: 'BBBBBB',
            description: 'BBBBBB',
            fullDay: true,
            eventStart: currentDate.format(DATE_TIME_FORMAT),
            eventEnd: currentDate.format(DATE_TIME_FORMAT),
            location: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventStart: currentDate,
            eventEnd: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MyEvent', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
