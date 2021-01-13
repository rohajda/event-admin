import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { EventAdminTestModule } from '../../../test.module';
import { MyEventComponent } from 'app/entities/my-event/my-event.component';
import { MyEventService } from 'app/entities/my-event/my-event.service';
import { MyEvent } from 'app/shared/model/my-event.model';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MockMatPaginator } from '../../../helpers/mock-mat-paginator';

export const createSpyObj = (baseName: string, methodNames: any[]): any => {
  const obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};

describe('Component Tests', () => {
  describe('MyEvent Management Component', () => {
    let comp: MyEventComponent;
    let fixture: ComponentFixture<MyEventComponent>;
    let service: MyEventService;
    let mockPaginator: MockMatPaginator;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [EventAdminTestModule, MatPaginatorModule, MatSortModule, NoopAnimationsModule, BrowserDynamicTestingModule],
        declarations: [MyEventComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          },
          MatPaginatorIntl
        ]
      })
        .overrideTemplate(MyEventComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MyEventComponent);

      comp = fixture.componentInstance;
      mockPaginator = TestBed.get(MatPaginator);

      // comp.paginator = createSpyObj('MatPaginator', ['length', 'pageIndex', 'pageSize']);
      comp.paginator = TestBed.createComponent(MatPaginator).componentInstance;

      comp.sort = new MatSort();
      fixture.detectChanges();

      service = fixture.debugElement.injector.get(MyEventService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MyEvent(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.myEvents && comp.myEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MyEvent(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.myEvents && comp.myEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sortData();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sortData();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
