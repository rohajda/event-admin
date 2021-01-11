import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IMyEvent, MyEvent } from 'app/shared/model/my-event.model';
import { MyEventService } from './my-event.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-my-event-update',
  templateUrl: './my-event-update.component.html'
})
export class MyEventUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required, Validators.maxLength(120)]],
    description: [null, [Validators.required, Validators.maxLength(2000)]],
    fullDay: [],
    eventStart: [null, [Validators.required]],
    eventEnd: [null, [Validators.required]],
    location: [null, [Validators.maxLength(200)]],
    eventImage: [],
    eventImageContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected myEventService: MyEventService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ myEvent }) => {
      if (!myEvent.id) {
        const today = moment().startOf('day');
        myEvent.eventStart = today;
        myEvent.eventEnd = today;
      }

      this.updateForm(myEvent);
    });
  }

  updateForm(myEvent: IMyEvent): void {
    this.editForm.patchValue({
      id: myEvent.id,
      title: myEvent.title,
      description: myEvent.description,
      fullDay: myEvent.fullDay,
      eventStart: myEvent.eventStart ? myEvent.eventStart.format(DATE_TIME_FORMAT) : null,
      eventEnd: myEvent.eventEnd ? myEvent.eventEnd.format(DATE_TIME_FORMAT) : null,
      location: myEvent.location,
      eventImage: myEvent.eventImage,
      eventImageContentType: myEvent.eventImageContentType
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('eventAdminApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const myEvent = this.createFromForm();
    if (myEvent.id !== undefined) {
      this.subscribeToSaveResponse(this.myEventService.update(myEvent));
    } else {
      this.subscribeToSaveResponse(this.myEventService.create(myEvent));
    }
  }

  private createFromForm(): IMyEvent {
    return {
      ...new MyEvent(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      fullDay: this.editForm.get(['fullDay'])!.value,
      eventStart: this.editForm.get(['eventStart'])!.value ? moment(this.editForm.get(['eventStart'])!.value, DATE_TIME_FORMAT) : undefined,
      eventEnd: this.editForm.get(['eventEnd'])!.value ? moment(this.editForm.get(['eventEnd'])!.value, DATE_TIME_FORMAT) : undefined,
      location: this.editForm.get(['location'])!.value,
      eventImageContentType: this.editForm.get(['eventImageContentType'])!.value,
      eventImage: this.editForm.get(['eventImage'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMyEvent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
