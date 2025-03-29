import { TestBed } from '@angular/core/testing';

import { SelectedTabStateService } from './selected-tab-state.service';

describe('SelectedTabStateService', () => {
  let service: SelectedTabStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedTabStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
