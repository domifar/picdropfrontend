import { TestBed } from '@angular/core/testing';

import { SelectedTab } from './selectedTab';

describe('SelectedTabStateService', () => {
  let service: SelectedTab;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedTab);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
