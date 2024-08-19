import { TestBed } from '@angular/core/testing';

import { ErrorMediaService } from './error-media.service';

describe('ErrorMediaService', () => {
  let service: ErrorMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
