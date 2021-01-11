import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EventAdminTestModule } from '../../../test.module';
import { MyEventUpdateComponent } from 'app/entities/my-event/my-event-update.component';
import { MyEventService } from 'app/entities/my-event/my-event.service';
import { MyEvent } from 'app/shared/model/my-event.model';

describe('Component Tests', () => {
  describe('MyEvent Management Update Component', () => {
    let comp: MyEventUpdateComponent;
    let fixture: ComponentFixture<MyEventUpdateComponent>;
    let service: MyEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EventAdminTestModule],
        declarations: [MyEventUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MyEventUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MyEventUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MyEventService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MyEvent(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MyEvent();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
