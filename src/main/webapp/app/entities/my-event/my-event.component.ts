import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subscription } from 'rxjs';
import { JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMyEvent } from 'app/shared/model/my-event.model';
import { MyEventService } from './my-event.service';
import { MyEventDeleteDialogComponent } from './my-event-delete-dialog.component';
import { MyEventDatasource } from 'app/entities/my-event/my-event.datasource';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'jhi-my-event',
  styleUrls: ['./my-event.component.scss'],
  templateUrl: './my-event.component.html'
})
export class MyEventComponent implements OnInit, OnDestroy {
  myEvents?: IMyEvent[];

  private subscriptions: Subscription[] = [];
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  displayedColumns: string[] = ['title', 'fullDay', 'eventStart', 'eventEnd', 'location', 'actions'];
  dataSource: MyEventDatasource;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  constructor(
    protected myEventService: MyEventService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
    this.dataSource = new MyEventDatasource(this.myEventService);
  }

  loadPage(): void {
    this.dataSource.loadEvents(this.paginator.pageIndex, this.paginator.pageSize, this.sortData());
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInMyEvents();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    /* Data load will be triggered in two cases:
  - when a pagination event occurs => this.paginator.page
  - when a sort event occurs => this.sort.sortChange
  **/
    const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadPage()))
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

  trackId(index: number, item: IMyEvent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInMyEvents(): void {
    const eventSubscriber = this.eventManager.subscribe('myEventListModification', () => this.loadPage());
    this.subscriptions.push(eventSubscriber);
  }

  delete(myEvent: IMyEvent): void {
    const modalRef = this.modalService.open(MyEventDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.myEvent = myEvent;
  }

  sortData(): string[] {
    const result = [this.sort.active + ',' + this.sort.direction];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
}
