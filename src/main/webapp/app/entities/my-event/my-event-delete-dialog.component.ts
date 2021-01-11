import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMyEvent } from 'app/shared/model/my-event.model';
import { MyEventService } from './my-event.service';

@Component({
  templateUrl: './my-event-delete-dialog.component.html'
})
export class MyEventDeleteDialogComponent {
  myEvent?: IMyEvent;

  constructor(protected myEventService: MyEventService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.myEventService.delete(id).subscribe(() => {
      this.eventManager.broadcast('myEventListModification');
      this.activeModal.close();
    });
  }
}
