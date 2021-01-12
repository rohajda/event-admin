import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { IMyEvent } from 'app/shared/model/my-event.model';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { MyEventService } from 'app/entities/my-event/my-event.service';
import { HttpResponse } from '@angular/common/http';
import { catchError, distinctUntilChanged, finalize, skip } from 'rxjs/operators';

export class MyEventDatasource implements DataSource<IMyEvent> {
  private eventSubject = new BehaviorSubject<IMyEvent[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  subscriptions: Subscription[] = [];

  // Paginator | Paginators count
  paginatorTotalSubject = new BehaviorSubject<number>(0);
  paginatorTotal$: Observable<number>;
  hasItems = true; // Need to show message: 'No records found'

  public loading$ = this.loadingSubject.asObservable();

  constructor(private myEventService: MyEventService) {
    this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();

    // subscribe hasItems to (entitySubject.length==0)
    const hasItemsSubscription = this.paginatorTotal$.pipe(distinctUntilChanged(), skip(1)).subscribe(res => (this.hasItems = res > 0));
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

  loadEvents(page: number, size: number, sort: string[]): void {
    this.loadingSubject.next(true);

    this.myEventService
      .query({
        page,
        size,
        sort
      })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(res => {
        if (res instanceof HttpResponse) {
          this.eventSubject.next(res.body || []);
          this.paginatorTotalSubject.next(Number(res.headers.get('X-Total-Count')));
        } else {
          this.eventSubject.next([]);
          this.paginatorTotalSubject.next(0);
        }
      });
  }
}
