import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMyEvent, MyEvent } from 'app/shared/model/my-event.model';
import { MyEventService } from './my-event.service';
import { MyEventComponent } from './my-event.component';
import { MyEventDetailComponent } from './my-event-detail.component';
import { MyEventUpdateComponent } from './my-event-update.component';

@Injectable({ providedIn: 'root' })
export class MyEventResolve implements Resolve<IMyEvent> {
  constructor(private service: MyEventService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMyEvent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((myEvent: HttpResponse<MyEvent>) => {
          if (myEvent.body) {
            return of(myEvent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MyEvent());
  }
}

export const myEventRoute: Routes = [
  {
    path: '',
    component: MyEventComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'eventAdminApp.myEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MyEventDetailComponent,
    resolve: {
      myEvent: MyEventResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eventAdminApp.myEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MyEventUpdateComponent,
    resolve: {
      myEvent: MyEventResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eventAdminApp.myEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MyEventUpdateComponent,
    resolve: {
      myEvent: MyEventResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'eventAdminApp.myEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
