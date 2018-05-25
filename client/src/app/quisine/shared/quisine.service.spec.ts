import { TestBed, inject } from '@angular/core/testing';

import { QuisineService } from './quisine.service';

describe('QuisineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuisineService]
    });
  });

  it('should be created', inject([QuisineService], (service: QuisineService) => {
    expect(service).toBeTruthy();
  }));
});
