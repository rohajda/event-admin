import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EventAdminSharedModule } from 'app/shared/shared.module';
import { MyEventComponent } from './my-event.component';
import { MyEventDetailComponent } from './my-event-detail.component';
import { MyEventUpdateComponent } from './my-event-update.component';
import { MyEventDeleteDialogComponent } from './my-event-delete-dialog.component';
import { myEventRoute } from './my-event.route';

@NgModule({
  imports: [EventAdminSharedModule, RouterModule.forChild(myEventRoute)],
  declarations: [MyEventComponent, MyEventDetailComponent, MyEventUpdateComponent, MyEventDeleteDialogComponent],
  entryComponents: [MyEventDeleteDialogComponent]
})
export class EventAdminMyEventModule {}
