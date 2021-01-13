import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { UpcomingEventsDatasource } from 'app/home/upcoming.datasource';
import { EventService } from 'app/home/event.service';
import { distinctUntilChanged, skip } from 'rxjs/operators';
import { IMyEvent } from 'app/shared/model/my-event.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  private subscriptions: Subscription[] = [];

  upcomingEvents: IMyEvent[] = [];

  upcomingColumns: string[] = ['title', 'fullDay', 'eventStart', 'eventEnd', 'location'];
  upcomingDataSource: UpcomingEventsDatasource;

  constructor(protected eventService: EventService, private accountService: AccountService, private loginModalService: LoginModalService) {
    this.upcomingDataSource = new UpcomingEventsDatasource(this.eventService);
  }

  loadUpcomingEvents(): void {
    this.upcomingDataSource.loadEvents();
  }

  ngOnInit(): void {
    const authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.subscriptions.push(authSubscription);

    this.loadUpcomingEvents();

    const entitiesSubscription = this.upcomingDataSource.eventSubject.pipe(skip(1), distinctUntilChanged()).subscribe(res => {
      this.upcomingEvents = res;
    });
    this.subscriptions.push(entitiesSubscription);
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }
}
