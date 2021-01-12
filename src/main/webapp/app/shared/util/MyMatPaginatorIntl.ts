import { TranslateParser, TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class MyMatPaginatorIntl extends MatPaginatorIntl {
  private rangeLabelIntl = '';

  constructor(private translateService: TranslateService, private translateParser: TranslateParser) {
    super();
    this.getTranslations();

    this.translateService.onLangChange.subscribe(() => {
      this.getTranslations();
    });
  }

  getTranslations(): void {
    this.translateService
      .get([
        'global.field.paginator.itemsPerPage',
        'global.field.paginator.nextPage',
        'global.field.paginator.previousPage',
        'global.field.paginator.range',
        'global.field.paginator.firstPage',
        'global.field.paginator.lastPage'
      ])
      .subscribe(translation => {
        this.itemsPerPageLabel = translation['global.field.paginator.itemsPerPage'];
        this.nextPageLabel = translation['global.field.paginator.nextPage'];
        this.previousPageLabel = translation['global.field.paginator.previousPage'];
        this.rangeLabelIntl = translation['global.field.paginator.range'];
        this.firstPageLabel = translation['global.field.paginator.firstPage'];
        this.lastPageLabel = translation['global.field.paginator.lastPage'];
        this.changes.next();
      });
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return this.translateParser.interpolate(this.rangeLabelIntl, { startIndex: startIndex + 1, endIndex, length });
  };
}
