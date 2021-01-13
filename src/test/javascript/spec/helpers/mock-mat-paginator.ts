import Spy = jasmine.Spy;

import { SpyObject } from './spyobject';
import { MatPaginator } from '@angular/material/paginator';

export class MockMatPaginator extends SpyObject {
  length: Spy;

  constructor() {
    super(MatPaginator);
    this.length = this.spy('length').andReturn(5);
  }
}
