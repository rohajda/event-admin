import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'my-event',
        loadChildren: () => import('./my-event/my-event.module').then(m => m.EventAdminMyEventModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EventAdminEntityModule {}
