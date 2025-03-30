import { TestBed } from '@angular/core/testing';

import { ApiRequest } from './apiRequest';

describe('ApiRequestsService', () => {
  let service: ApiRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
