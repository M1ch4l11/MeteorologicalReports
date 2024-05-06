import { TestBed } from '@angular/core/testing';

import { FacadeTableService } from './facade-table.service';

describe('FacadeTableService', () => {
  let service: FacadeTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
