import { TestBed } from '@angular/core/testing';

import { PandawanService } from './pandawan.service';

describe('PandawanService', () => {
  let service: PandawanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PandawanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
