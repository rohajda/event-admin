import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMyEvent } from 'app/shared/model/my-event.model';

@Component({
  selector: 'jhi-my-event-detail',
  templateUrl: './my-event-detail.component.html'
})
export class MyEventDetailComponent implements OnInit {
  myEvent: IMyEvent | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ myEvent }) => (this.myEvent = myEvent));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
