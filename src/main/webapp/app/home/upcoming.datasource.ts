import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { IMyEvent } from 'app/shared/model/my-event.model';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { catchError, distinctUntilChanged, finalize, skip } from 'rxjs/operators';
import { EventService } from 'app/home/event.service';

export class UpcomingEventsDatasource implements DataSource<IMyEvent> {
  eventSubject = new BehaviorSubject<IMyEvent[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  subscriptions: Subscription[] = [];

  totalSubject = new BehaviorSubject<number>(0);
  total$: Observable<number>;
  hasItems = true; // Need to show message: 'No records found'

  public loading$ = this.loadingSubject.asObservable();

  constructor(private eventService: EventService) {
    this.total$ = this.totalSubject.asObservable();

    // subscribe hasItems to (entitySubject.length==0)
    const hasItemsSubscription = this.total$.pipe(distinctUntilChanged(), skip(1)).subscribe(res => (this.hasItems = res > 0));
    this.subscriptions.push(hasItemsSubscription);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  connect(collectionViewer: CollectionViewer): Observable<IMyEvent[]> {
    return this.eventSubject.asObservable();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disconnect(collectionViewer: CollectionViewer): void {
    this.eventSubject.complete();
    this.loadingSubject.complete();
  }

  loadEvents(): void {
    this.loadingSubject.next(true);

    this.eventService
      .query()
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(res => {
        if (res instanceof HttpResponse) {
          this.eventSubject.next(res.body || []);
          this.totalSubject.next(Number(res.headers.get('X-Total-Count')));
        } else {
          this.eventSubject.next([]);
          this.totalSubject.next(0);
        }
      });
  }
}
