import { TestBed } from '@angular/core/testing';

import { CargueExcelService } from './cargue-excel.service';

describe('CargueExcelService', () => {
  let service: CargueExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargueExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
